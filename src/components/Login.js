import { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate } from 'react-router';
import {userLogin} from '../slices/userSlice'

function Login(){
    let {userObj,isPending,isFulfilled,isRejected,errMsg}=useSelector((state)=>state.userData)
    const {register,handleSubmit,formState:{errors}}=useForm();
    let dispatch=useDispatch()
    let navigate=useNavigate()
    const onFormSubmit=(loginData)=>{
       dispatch(userLogin(loginData))
    }
    useEffect(() => {
        if (isFulfilled) {
          navigate("/userdashboard");
        }
      }, [isFulfilled, isRejected]);
    return(
        <>
        <div className='login'>
            <h1 className='display-4 text-center pt-3'>Login</h1>
                <hr className='container'/>
                <form onSubmit={handleSubmit(onFormSubmit)} className="col-11 col-sm-6 col-lg-4 mx-auto">
                    <div className='mb-3'>
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" className='form-control' {...register("username",{required:true})} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className='form-control' {...register("password",{required:true})} />
                    </div>
                    <div className='mb-3'>
                        <button type="submit" className='btn btn-info'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;