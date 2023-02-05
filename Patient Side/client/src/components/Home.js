import React, {useState} from "react";
import { Row } from "react-bootstrap";
import UserInfo from "./UserInfoCard/UserInfo";
import PrescriptionStatusCard from "./PrescriptionStatusCard/PresShopPay.js";

function Home(){
  return(
    <>
        <Row className="spacer"></Row>
        <UserInfo/>
        <PrescriptionStatusCard/>
        <Row className="spacer"></Row>
        <Row className="spacer"></Row>
        <Row className="spacer"></Row>
    </>
)
}

export default Home