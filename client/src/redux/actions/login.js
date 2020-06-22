import { userInstance } from "../../config/axiosconfig"
import { LOGIN, LOGOUT,PROFILE } from "./types";

export const loginReq=({email,password})=>async dispatch=>{
        const payload ={
            email:email,
            password:password
        }
        try{
            const res = await userInstance.post('/login',payload);
            const {code,msg,token,id}=res.data;
            if(code===200){
                window.location.href='/'
               return dispatch({
                    type:LOGIN,
                    payload:token
                })
            }
            else{
                
            }
        }
        catch(err){
            console.log(`err ${err}`);
        }

}

export const logoutReq=()=>dispatch=>{
        dispatch({
            type:LOGOUT
        })
        window.location.href='/';

}

export const getProfile=()=> async dispatch=>{
    try{
        const res = await userInstance.get('/getProfile');
        const {code,profile_data} = res.data;
        console.log("res",res)
        if(code===200){
            console.log(res)
            dispatch({
            type:PROFILE,
            payload:profile_data
             })
        }
        
    }catch(e){

    }
       
}