import { genSalt, hash } from "bcryptjs";
import jwt from 'jsonwebtoken';
import { userJwtKey } from "../config/key";

export const CheckIfEmpty=(obj)=>{
    const err=[];
    for (let key in obj){
        if(![key]){
            err.push({[key]:values[key]});
        }
    }
    return {isValid:err.length>0?false:true}

}

export const hashPassword =(password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const salt = await genSalt(10);
            const hashedpassword = await hash(password,salt);
            resolve(hashedpassword)
        }catch(err){
            reject(false);
        }
    })
}

export const verifyJwt = token => {
    return new Promise(async (resolve, reject) => {
      try {
        const isTokenValid = await jwt.verify(token, userJwtKey);
        if (isTokenValid) {
          resolve(isTokenValid);
        }
      } catch (e) {
        reject(false);
      }
    });
  };

