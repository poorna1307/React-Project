import {configureStore} from '@reduxjs/toolkit';
import userLoginReducer from './slices/userSlice'

export const store=configureStore({
    reducer:{
        userData:userLoginReducer
    }
})