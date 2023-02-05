import React, {useState} from "react";
import './App.css';
import  SignIn from "./components/signIn";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SubsPlan from "./components/subsPlan";
import NavbarComp from "./components/Navbar/NavbarComp";
import Footer from "./components/Footer";


function App() {

  
  return(
    <BrowserRouter>
      <NavbarComp/>
      <Routes>
        <Route path = "/" element = {<SignUp/>}/>
        <Route path="/signIn" element = {<SignIn />}/>
        <Route path="/Home" element = {<Home />}/>
        <Route path="/SubsPlan" element = {<SubsPlan />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}


export default App;
