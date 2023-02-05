import React from "react";
import {Col, Container, Row } from "react-bootstrap";
import './styles.css';
import Web3 from "web3";


function UserInfo() {
    
    var account = null;
    (async () => {
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts' )
            window.w3 = new Web3(window.ethereum)
            
            var accounts = await window.w3.eth.getAccounts()
            account = accounts[0];
            // console.log(account);
            document.getElementById("wallet-ID").textContent = account;
        }
    })();
 {
        return (
            
            <div>
                <Row>
                    <Col>
                        <Container className="darkbg">
                            <Row>
                                <Col xs={1}></Col>
                                <Col>
                                    <Row>
                                        <Container className="darkbg"></Container>
                                    </Row>
                                    <Container className="lightbg">
                                        <Row>
                                            <Col xs={1}></Col>
                                            <Col >
                                                <Container className="greenbg mb-3"></Container>
                                            </Col>
                                            <Col xs={1}></Col>
                                        </Row>
                                        <Row className="spacer"></Row>
                                        <Row>
                                            <Col xs={2}></Col>
                                            <Col >
                                                <Container><h2>Hello, Welcome to Insurachain!</h2></Container>
                                            </Col>
                                            <Col xs={2}> </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={2}></Col>
                                            <Col >
                                                <Container><h5>Wallet ID: <span id ="wallet-ID"></span></h5></Container>
                                            </Col>
                                            <Col xs={2}></Col>
                                        </Row>
                                        <Row className="spacer"></Row>
                                        <Row>
                                            <Col xs={1}></Col>
                                            <Col >
                                                <Container className="greenbg mb-3"></Container>
                                            </Col>
                                            <Col xs={1}></Col>
                                        </Row>
                                    </Container>
                                    <Row>
                                        <Container className="darkbg"></Container>
                                    </Row>
                                </Col>
                                <Col xs={1}></Col>
                            </Row>
                        </Container>
                        
                    </Col>
                </Row>
            </div>
        )
    };
}

export default UserInfo;