import {useForm} from 'react-hook-form';
import { BiLogInCircle } from "react-icons/bi";
import {useNavigate} from "react-router";
import axios from 'axios'
import { useState } from 'react';
function SignUp(){
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate()
    let [img,setImg]=useState(null);
    const onImageSelect=(event)=>{
        setImg(event.target.files[0])
    }
    const onFormSubmit=(userObj)=>{
        let formData= new FormData()
        formData.append("userObj",JSON.stringify(userObj))
        formData.append("photo",img)
        axios.post('/user-api/create-user',formData)
        .then(response=>{
            alert(response.data.message)
            if(response.data.message==="User Created successfully..."){
                navigate("/login")
            }
        })
        .catch(error=>{
            alert(`error occured ${error}`)
        })
    }  
    return(
        <>
        <div className='signup'>       
            <h1 className='display-4 text-center mt-2'>SignUp</h1>
            <hr className='container' />
            <div className="row">
            <form className="mx-auto mt-5 col-lg-4 col-sm-7 col-10" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">UserName</label>
                    <input type="text" className='form-control' {...register("username",{required:true})}/>
                    {errors.username?.type==="required" && <p className='text-danger'>*Username is Required</p>}
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" id="email" className="form-control" {...register("email",{required:true})}/>
                {errors.email?.type==="required" && <p className='text-danger'>*Email is Required</p>}
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" {...register("password",{required:true})}/>
                {errors.password?.type==="required" && <p className='text-danger'>*Password is Required</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="photo" className='form-label'>Select Profile</label>
                    <input type="file" className='form-control'
                    {...register('photo',{required:true})}
                    onChange={(event)=>onImageSelect(event)}
                    />
                </div>
                <button type="submit" className="btn btn-info">Submit <BiLogInCircle/> </button>
                </form>
                </div>
                </div>                
        </>
    )
}
export default SignUp;