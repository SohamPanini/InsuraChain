import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Web3 from "web3";
import '../App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function SignIn() {
  let account = null
  let accessToken = null
  let w3

  const navigate = useNavigate()
  const signInhandler = async () => {
    try{
      if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts' )
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
      }
    } catch (err) {
      console.log(err.message)
    }
    accessToken = await Authenticate()
    // console.log(accessToken)
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
    }
  }
    let res = await fetch(`http://localhost:3001/secret`, opts)
    alert(await res.text())
    navigate("/Home");
}

  const Authenticate = async () => {
    let res = await fetch(`http://localhost:3001/nonce?address=${account}`)
    let resBody = await res.json()
    // console.log(resBody)
    
    let signature = await window.w3.eth.personal.sign(resBody.message, account)
    // console.log(signature) 

    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${resBody.tempToken}`
    }
  }
    res = await fetch(`http://localhost:3001/verify?signature=${signature}`, opts)
    resBody = await res.json()
    return resBody.token
  
  }
  return (
    // <div className="App">
    //   <h1> Sign In</h1>
    //   <button onClick={signInhandler}> sign in </button>
    // </div>
    <Container>
    <Row>
        <Col></Col>
        <Col className="App">
        <div style={{height: "40px"}}></div>
        <h1>Patient Sign-In</h1>
        <div style={{height: "40px"}}></div>
        

        <div style={{height: "40px"}}></div>
        <Row>
            <Button onClick = {signInhandler} variant="primary">
                Sign In
            </Button>
        </Row>
        </Col>
        <Col></Col>
    </Row>
</Container>
  );
}

export default SignIn;