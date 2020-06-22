import { LOGIN, LOGOUT, PROFILE } from "../actions/types";


const initialState={
    user:null,
    token:null,
    isAuthenicated:false,
    loading:false
}

export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case LOGIN:
            localStorage.setItem("token",payload);
        return {
            ...state,
            token:payload,
            isAuthenicated:true,
            loading:false
        }
        case LOGOUT:
            localStorage.removeItem("token");
            return{
                ...state,
                user:null,
                isAuthenicated:false,
                loading:false
            }
        case PROFILE:
            return{
                ...state,
                user:payload,
                loading:false
            }
        default:
            return state
       
    }
    

}