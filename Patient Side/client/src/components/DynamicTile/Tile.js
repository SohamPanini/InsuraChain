import { Accordion, Row, Col, Container } from "react-bootstrap";
import "./styles.css";
import { useState, useEffect } from 'react';
import Web3 from "web3";

import ashHandler2ABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason
import ashSettlementsABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason
import fetchDataABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason
import ashPaymentABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason

const dataCollection = ['Prescription link 1', 'Prescription link 2', 'Prescription link 3', 'prescription link 4'];
// const dataCollection = []



const ashHandler2Address = "0x9f2b7743a9548AAF398fc089D74f34b5847C9a6a"//Your Contract Address
const ashSettlementsAddress = "0x0138d3F9C8E2CB89c139A344318F8c3CF435307a"//Your Contract Address
const fetchDataAddress = "0xE38Cc215Bb51389c228e57298800B10c01663e76"//Your Contract Address
const ashPaymentAddress = "0x56f003e7eFE9044d0eCC9b7C54c139E2004b3132"//Your Contract Address

function ReusableAccordion(){
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };



    var account = null;
    let con = new Web3(Web3.givenProvider || "http://localhost:7545");
    var ashHandler2Contract = new con.eth.Contract(ashHandler2ABI, ashHandler2Address);
    var ashSettlementsContract = new con.eth.Contract(ashSettlementsABI, ashSettlementsAddress);
    var fetchDataContract = new con.eth.Contract(fetchDataABI, fetchDataAddress);
    var ashPaymentContract = new con.eth.Contract(ashPaymentABI, ashPaymentAddress);

    const [dataCollection, setDataCollection] = useState([]);
    const [presFileName, setPresFileName] = useState("");
    const [toggler, setToggler] = useState(false);
    const [planId, setPlanId] = useState(0); 
    // const [indexHash, setIndexHash] = useState(0);

    const dataElements = dataCollection.length;

    useEffect(() => {
        test();
    } , []);

    const gettingHashFromPres = async (item) => {
        // console.log("this is the item of the accordion" + item)
        openInNewTab("https://ipfs.io/ipfs/" + item)
        // console.log("this is the index of the accordion" + index)
        
        // openInNewTab();
    }

    const test = async () => {
        // console.log("test");
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
        // console.log(account);

        var lol = await ashHandler2Contract.methods.fetchMedHistoryList(account).call();
        setDataCollection(() => lol);
        console.log(lol);

        var lolll = await fetchDataContract.methods.fetchPresName(account).call()
        setPresFileName(() => lolll);
        console.log(lolll)

        var planSubscribedTo = await ashPaymentContract.methods.subscribedTO(account).call();
        console.log("this is the planid in tile.js  " + planSubscribedTo);
        setPlanId(planSubscribedTo)

        if (planSubscribedTo == 0){
            setToggler(true)}
        else{
            setToggler(false)
        }

    }

    const claimFunc = async (item, index) => {
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
        // console.log(account);
        console.log(index);

        var stringData = await fetchDataContract.methods.fetchFromAddressToDisease(account).call();
        console.log(stringData);

        var planSubscribedTo = await ashPaymentContract.methods.subscribedTO(account).call();
        console.log(planSubscribedTo);
        // setPlanId(planSubscribedTo)

        var fetchClaimStatusPresKa = await ashHandler2Contract.methods.fetchClaimStatus(item).call();
        console.log("item ki value is " + item)
        console.log(fetchClaimStatusPresKa)
        if (fetchClaimStatusPresKa == true){
            console.log("already claimed")
            alert("you have already claimed on this prescription")
        }
        else {
            console.log("inside else block")
            var lol2 = await ashSettlementsContract.methods.claimVerification(stringData[index],planSubscribedTo).send({from: account});
            console.log("claim verification chal gaya" + lol2);
            var setClaimstatusPresKa = await ashHandler2Contract.methods.setClaimStatus(item).send({from: account});
            console.log("chutiya func" + setClaimstatusPresKa)
        }

        window.location.reload();
    }

    if(dataElements !== 0)
    {
        return(
            <>
            <Accordion>
                {dataCollection.map((item, index) => 
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header>{presFileName[index]}</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    Details of prescription #{index+1}
                                </Row>
                                <Row className="spacer"></Row>
                                    <Row>
                                        <Col xs={1}></Col>
                                        <Col xs={4}>
                                            <Row>
                                                <button disabled = {toggler} onClick = {() => claimFunc(item, index)} className = "exchange__button" type="submit">
                                                    Claim 
                                                </button>
                                            </Row> 
                                        </Col>
                                        <Col xs={2}></Col>
                                        <Col xs={4}>
                                            <Row>
                                                
                                                <button className = "exchange__button input-btn-padding-y" onClick={() => gettingHashFromPres(item)}>
                                                    Link
                                                </button>
                                            </Row>
                                        </Col>
                                        <Col xs={1}></Col>
                                    </Row>  
                            </Accordion.Body>
    
                        </Accordion.Item>
                )}
            </Accordion>
            </>
        )
    }
    else{
        return(
            <>
            <Container>
                <Row className="spacer"></Row>
                <Row>
                    <h4> No prescriptions to show.</h4>
                </Row>
                <Row className="spacer"></Row>
            </Container>
            </>
        )
    }
}

export default ReusableAccordion;
