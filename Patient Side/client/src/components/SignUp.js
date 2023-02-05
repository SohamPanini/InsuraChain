import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Axios from "axios";
import '../App.css';
import ConnectWallet from "../connectWallet";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


function SignUp() {

  const [patientName, setPatientName] = useState("");
  const [patientAdhar, setPatientAdhar] = useState("");
  const [patientWalletAdress, setPatientWalletAdress] = useState("");

  const navigate = useNavigate()

  const submit = () => {
    console.log(patientName);
    Axios.post("http://localhost:3001/insert", {
      patientName: patientName,
      patientAdhar: patientAdhar,
      patientWalletAdress: patientWalletAdress
    }).then((result) => {
      if (result["data"]["success"] === true) {
        alert("Patient Added Successfully");
        navigate("/Home");
      } else {
        alert("Failed To Add Patient");
      }
    });
    // console.log(patientName);
  };


  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div style={{ height: "40px" }}></div>
          <h1>Patient Sign-Up Form</h1>
          <div style={{ height: "40px" }}></div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control onChange={(event) => {setPatientName(event.target.value)}} type="text" placeholder="Enter Patient Name" required/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Patient Aadhar</Form.Label>
              <Form.Control onChange={(event) => {setPatientAdhar(event.target.value)}}type="text" placeholder="Enter Patient Aadhar" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Wallet Address</Form.Label>
              <Form.Control onChange={(event) => {setPatientWalletAdress(event.target.value)}}type="text" placeholder="Enter Wallet Address" required />
            </Form.Group>

            <div style={{ height: "20px" }}></div>
            <Row>
            <Col xs={2}></Col>
            <Col>
              <Button classname = "btn" onClick = {submit}>Submit</Button>
            </Col>
            <Col xs={2}></Col>
            </Row>

            <div style={{ height: "20px" }}></div>


            <Row>
            <Col xs={2}></Col>
            <Col>
              <ConnectWallet/> 
            </Col>
            <Col xs={2}></Col>
            </Row>

            <Row className="spacer"></Row>
            
            <Row className="App">
              <Container>
                <a href="/signIn">Already an existing user? Sign In</a>
              </Container>
            </Row>

          </Form>

        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default SignUp;