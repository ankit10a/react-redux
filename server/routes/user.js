import express from 'express';
import { CheckIfEmpty, hashPassword } from '../functions/function';
import userModel from '../models/user';
import { genSalt, hash, compare } from 'bcryptjs';
import {sign} from "jsonwebtoken";
import { userJwtKey } from '../config/key';
import { userAuthCheckByLocal } from '../middleware/middleware';


const router = express.Router();

const userRouter=()=>{

router.post("/signup",async(req,res)=>{
    console.log(req);
        const body = req.body;
        const {isValid} = CheckIfEmpty(body);
            try{
             if(isValid){
                 console.log("e")
                    const isUserExist = await userModel.findOne({
                        email:{
                            $regex:`^${body.email}$`,
                            $options:"i"
                        }
                        // email:body.email
                    });
                    console.log("user Exist",isUserExist)
                    if(!isUserExist){
                        // const salt = await genSalt(10);
                        // const hashedPassword = await hash(body.password,salt);
                        const hashedPassword = await hashPassword(body.password);
                        if(hashedPassword){
                            req.body.password = hashedPassword;
                             const userData= new userModel(req.body);
                             const saveData = await userData.save();
                             console.log("data is saved")
                             if(saveData){
                                 res.send({
                                     code:200,
                                     msg:"User is sucessfully registered"
                                 })
                             }
                        }  
                    }else{
                        res.send({
                            code:400,
                            msg:"User already Exists"
                        })
                    }
                }else{
                    res.send({
                        code:400,
                        msg:"Some Field is empty"
                    })
                }
    
            }catch(err){
                console.log(`user model sigup has error ${err}`);
                res.send({
                    error:err,
                    code:400,
                    msg:"Some Error Occured"
                })
            }   
})
router.post('/login', async(req,res)=>{
    const body = req.body;
    try{
        const isUserExist = await userModel.findOne({
            email:{
                $regex:`${body.email}`,
                $options:"i"
            }
        }); 
       
        if(isUserExist){
            const isPasswordverify = await compare(body.password,isUserExist.password);
            if(isPasswordverify){
                const payload = {
                    userid:isUserExist.id
                }
               
                const token  =  await sign(payload, userJwtKey,{
                    expiresIn:"2h"  
                })
                res.send({
                    code: 200,
                    token:token,
                    id:isUserExist.id,
                    msg: "Authenticated",
                  });
    
            }
        }
        else{
            res.send({
                code:400,
                msg:"User is not Exist"
            })
        }
    }catch(err){
        console.log(`user login route catches err ${err}`);
    }
})

router.get("/getProfile", userAuthCheckByLocal, async (req, res) => {
    try {
      const _id = req.body.tokenData.userid;
      const profile_data = await userModel.findById({ _id }).select("-password");
      console.log("profile_data", profile_data);
      if (profile_data) {
        res.send({
          code: 200,
          profile_data: profile_data,
          msg: "Profile Data",
        });
      } else {
        res.send({ code: 404, msg: "user not found." });
      }
    } catch (e) {
        console.log(`user get profile get a errror ${e}`);
      res.send({
        code: 404,
        msg: "Something went Wrong",
      });
    }
  });

return router;

}

module.exports= userRouter;