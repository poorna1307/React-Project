import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const userLogin=createAsyncThunk("userlogin",async(userLoginDetails,thunkApi)=>{
let response=await axios.post('/user-api/login',userLoginDetails);
let data=response.data;
if(data.message==="Login success"){
    localStorage.setItem("loginToken",data.payload);
    return data.userdata;
}
if(data.message==="Invalid users" || data.message==="Invalid password"){
    return thunkApi.rejectWithValue(data);
}
})
const userLoginSlice=createSlice({
    name:"userLoginData",
    initialState:{
        userObj:{},
        isPending:false,
        isFulfilled:false,
        isRejected:false,
        errMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            state.userObj=null;
            state.isPending=false;
            state.isFulfilled=false;
            state.isRejected=false;
            state.errMsg='';
            localStorage.removeItem("login")
            return state;
        },
        addPlayHistory:(state,action)=>{
            state.userObj.playHistory.push(action.payload);
        }

    },
    extraReducers:{
        [userLogin.pending]:(state,action)=>{
            state.isPending=true
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isFulfilled=true;
            state.isRejected=false;
            state.isPending=false;
            state.errMsg='';
            localStorage.setItem("login",true);
        },
        [userLogin.rejected]:(state,action)=>{
            state.isRejected=true;
            state.isPending=false;
            state.isFulfilled=false;
            state.errMsg=action.payload.message;
        }
    }
});
export const {clearLoginStatus,addPlayHistory}=userLoginSlice.actions;
export default userLoginSlice.reducer;