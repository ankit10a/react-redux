import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { userInstance } from '../../config/axiosconfig';
import { Redirect } from 'react-router-dom';
import {loginReq} from '../../redux/actions/login';
import { checkIfEmpty } from '../../functions/function';
import {connect} from 'react-redux';

const Login = ({loginReq}) => {
const [userData,setUserData]=useState({
    email:"",
    password:""
})

const handleChange=(e)=>{
    setUserData({...userData, [e.target.id] :e.target.value});
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    // const res = await userInstance.post('/login',userData);
    // console.log("res",res);
    // if(res.data.code===200){
    //     localStorage.setItem("token",res.data.token)
    //     window.location.href='/';
    // }
    const {isValid} =checkIfEmpty(userData);
    if(isValid){
        loginReq(userData);
    }

}

    return (
        <MDBContainer className="align-items-center" >
        <MDBRow className=" justify-content-center mt-4">
            <MDBCol md="4" className="border rounded">
            <form>
                <p className="h5 text-center mb-4 mt-3">Login</p>
                <div className="grey-text">
                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                    onChange={handleChange} value={userData.email} id="email"
                    success="right" />
                <MDBInput label="Type your password" icon="lock" group type="password" validate 
                    onChange={handleChange} value={userData.password}
                    id="password"/>
                </div>
                <div className="text-center">
                <MDBBtn onClick={(e)=>handleSubmit(e)}>Login</MDBBtn>
                </div>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default connect(null,{loginReq})(Login)
