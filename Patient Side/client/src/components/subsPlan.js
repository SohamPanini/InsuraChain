import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

import ashPaymentABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason


const ashPaymentAddress = "0x56f003e7eFE9044d0eCC9b7C54c139E2004b3132"//Your Contract Address

function SubsPlan() {
    const navigate = useNavigate();

    
    let con = new Web3(Web3.givenProvider || "http://localhost:7545");
    var ashPaymentContract = new con.eth.Contract(ashPaymentABI, ashPaymentAddress);

    const data = [
        { plan: "1", disease: "aids, bipolar, schizophrenia, asthma" , subscriptionAmount: "10", claimAmount: "10" },
        { plan: "2", disease: "diabetes, epilepsy, jaundice", subscriptionAmount: "20", claimAmount: "20"},
        { plan: "3", disease: "alzheimer, cancer, fibrosis", subscriptionAmount: "30", claimAmount: "30"},
      ]

    const [toggleButton, setToggleButton] = React.useState(false);
    const [key, setKey] = React.useState(0);

    const navigateToHome = () => {
        navigate("/Home", {state: {planId: key}});
    }

    const SubscribeFunc = async (key) => {
        var account = null;
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
        key = key + 1;
        var lol = await ashPaymentContract.methods.subscribe(key).send({from: account});
        console.log(lol);
        alert("You are now subscribed to plan " + key);
        setKey(key);
        stateToggler();
    }

    const cancelSubscribeFunc = async () => {
        var account = null;
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
        var key2 = await ashPaymentContract.methods.subscribedTO(account).call();
        console.log(key2);
        var lol2 = await ashPaymentContract.methods.cancel(key2).send({from: account});
        console.log(lol2);
        alert("You have unsubscribed from plan");
        setKey(0)
        stateToggler();
        
    }

    const stateToggler = async () => {
        var account = null;
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
        var plan1 = await ashPaymentContract.methods.nextPayment(account, 1).call();
        // console.log(plan1);
        var plan2 = await ashPaymentContract.methods.nextPayment(account, 2).call();
        // console.log(plan2);
        var plan3 = await ashPaymentContract.methods.nextPayment(account, 3).call();
        console.log(plan3);

        if (plan1 == 0 && plan2 == 0 && plan3 == 0) {
            setToggleButton(false); //sub is enabled
        } else {
            setToggleButton(true);
        }
    }
        
    // useEffect(() => {}, [stateToggler]);
    useEffect(() => {stateToggler()}, [toggleButton]);

    // useEffect(() => {
    //     setToggleButton(JSON.parse(window.localStorage.getItem("Toggle")));
    // },[]);

    // useEffect(() => {
    //     window.localStorage.setItem("Toggle", toggleButton);
    // }, [toggleButton]);


    return (
        <Row>
            <Col>
                <Container className="lightbg">
                    <div className="appTable" >
                        <center>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Plan No.</td>
                                        <td>Disease</td>
                                        <td>Subscription Amount</td>
                                        <td>Claim Amount</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                {data.map((val, key) => {
                                    return (
                                        <tbody key={key}>
                                            <tr>
                                                <td>{val.plan}</td>
                                                <td>{val.disease}</td>
                                                <td>{val.subscriptionAmount}</td>
                                                <td>{val.claimAmount}</td>
                                                <td>
                                                    <button disabled = {toggleButton} className="exchange__button__HOME" onClick={() => SubscribeFunc(key)}>Subscribe</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                            <Container>
                                <Row className="spacer"></Row>
                                <Row className="spacer"></Row>
                                <button disabled = {!toggleButton} className="danger-text" onClick={cancelSubscribeFunc}>Cancel Subscription</button>
                            </Container>
                            <Container>
                                <Row className="spacer"></Row>
                                <button onClick = {navigateToHome} className="danger-text"> Go Back </button>
                            </Container>
                        </center>
                    </div>
                </Container>
            </Col>

        </Row>
        
    )
}

export default SubsPlan;