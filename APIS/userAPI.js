require('dotenv').config()
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs')
const exp=require('express')
const jwt=require('jsonwebtoken')
const userAPI=exp.Router()

let cloudinary=require("cloudinary").v2;
const {CloudinaryStorage} =require("multer-storage-cloudinary")
const multer=require("multer")
//configure cloudinary
cloudinary.config({
    cloud_name:process.env.COULD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true
});
//configure cloudinary storage
const cloudinaryStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return {
            folder:"Poorna",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
});
//configure  multer
let upload = multer({storage:cloudinaryStorage})
//To extract body of request object.
userAPI.use(exp.json())

//create a route to '/login' path

userAPI.post('/login',asyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    userObj=request.body
    let tempObj=await userCollectionObj.findOne({username:userObj.username});
    console.log(tempObj)
    if(tempObj===null){
        response.send({message:"Invalid users"})
    }
    else{
        const status=await bcrypt.compare(userObj.password,tempObj.password)
        if(status==false){
            response.send({message:"Invalid password"})
        }
        else{
            let token=jwt.sign({username:userObj.username},''+process.env.SECURITY,{expiresIn:60})
            response.send({message:"Login success",payload:token,userdata:tempObj})
        }
    }
}))

//create a route to create-user path

userAPI.post('/create-user',upload.single("photo"),asyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj");
    let newUser=JSON.parse(request.body.userObj);
    let userObj=await userCollectionObj.findOne({username:newUser.username});
    if(userObj!==null){
        response.send({message:"The username already exist..please choose another.."})
    }
    else{
        let hashedPassword= await bcrypt.hash(newUser.password,5)
        newUser.password=hashedPassword;
        newUser.photo=request.file.path;
        newUser.playHistory=[];
        await userCollectionObj.insertOne(newUser)
        response.send({message:"User Created successfully..."})
    }
}))


userAPI.put('/update-user',asyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    let {user,Details}=request.body
    console.log(user)
    let userObj=await userCollectionObj.findOne({username:user});
    userObj.playHistory.push(Details)
    let newValue=userObj.playHistory
    console.log(newValue)
    await userCollectionObj.updateOne({username:user},{$set:{playHistory:newValue}})
    response.send({message:"Data updated..."})
}))

module.exports=userAPI;