import React, { useState, useEffect } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";
import {logoutReq,getProfile} from '../../redux/actions/login';
import { connect } from 'react-redux';


const Navbar = ({isAuthenicated,user,logoutReq,getProfile}) => {
     const [collapseID,setCollapseID]=useState(false);
     useEffect(()=>{
      if(isAuthenicated){
        getProfile();
      }
     },[])

     const toggleCollapse=()=>{
         setCollapseID(!collapseID);
     }
  
    return (
        <header>
        <MDBContainer>
          <MDBNavbar color="info-color" dark expand="md" style={{ marginTop: "20px" }}>
            <MDBNavbarBrand href="/">
              <strong className="white-text">Test </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={()=>toggleCollapse("navbarCollapse3")} />
            <MDBCollapse id="navbarCollapse3" isOpen={collapseID} navbar>
              <MDBNavbarNav right>
              <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/">
                    <MDBIcon icon="home" className="mr-1" />Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/contact">
                    <MDBIcon icon="envelope" className="mr-1" />Contact</MDBNavLink>
                </MDBNavItem>
                {
                  localStorage.getItem("token")?<>
                   <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" className="mr-1" />Profile
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem href="#!">My account</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>{
                       logoutReq();
                       }}>Log out</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem></> :<>
                 <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/login">
                    <MDBIcon icon="user" className="mr-1" />Login</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/signup">
                    <MDBIcon icon="" className="mr-1" />Signup</MDBNavLink>
                </MDBNavItem></>
                }
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </MDBContainer>
     
        </header>
    )
}
const mapStateToProps=state=>({
  isAuthenicated:state.isAuthenicated,
  user:state.user
});

export default connect(mapStateToProps,{logoutReq,getProfile})(Navbar);
