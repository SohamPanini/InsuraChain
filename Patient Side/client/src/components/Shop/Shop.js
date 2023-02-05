import React, { useState } from 'react';
import { useEffect } from 'react';
import "./shop.css";
import Web3 from 'web3';
import HandlerABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason
import InsuraCoinABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason
import ShopABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason

const HandlerAddress = "0x06f6F5E1a10782A4e11Be3B6Ab82b2fCD2273eAe";//Your Contract Address
const InsuraCoinAddress = "0xF3744Be2efa9450E49fC3E62862299c7f9c1a764";//Your Contract Address
const ShopAddress = "0xa5FCf8d71033e62e1Dc50237BC3F9295B40D8593";//Your Contract Address

function Shop() {
    
    var account = null;
    let con = new Web3(Web3.givenProvider || "http://localhost:7545"); 
    var HandlerContract = new con.eth.Contract(HandlerABI, HandlerAddress);
    var InsuraCoinContract = new con.eth.Contract(InsuraCoinABI, InsuraCoinAddress);
    var ShopContract = new con.eth.Contract(ShopABI, ShopAddress);
    // console.log(HandlerContract);

    // var ashContract5 = new con.eth.Contract(ashContract5ABI, ashContract5Address);
    // var ashHandler2 = new con.eth.Contract(ashHandler2ABI, ashHander2Address);

    const [buyTokens, setBuyTokens] = useState("");
    const [sellTokens, setSellTokens] = useState("");
    const [balance, setBalance] = useState(0);
    const [shopbalance, setShopBalance] = useState(0);

    const purchase = async () => {
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts' )
            window.w3 = new Web3(window.ethereum)
            var accounts = await window.w3.eth.getAccounts()
            account = accounts[0];
            console.log(account); // yeh woh account hai jo metamask mein hai
        }

        // InsuraCoinContract.methods.transfer(ShopAddress, 10000).send({
        //     from: account
        // });
        const requestBuy = await ShopContract.methods.buyTokens().send({
        from: accounts[0],
        value: Web3.utils.toWei(buyTokens.toString(), "wei"),
        });
        // console.log(requestBuy);

        // const hardcodecheck = await ashContract5.methods.addData("0xDe75012f00fFa0B169aDD7ECBbB8D2336ca1AA37","CHUTIYA ASHISH").send({
        //     from: accounts[0]
        // });
        // console.log(hardcodecheck);

        // const hardcode = await ashContract5.methods.getData("0xDe75012f00fFa0B169aDD7ECBbB8D2336ca1AA37",1).call();
        // console.log(hardcode);
        updateBalance();
    }

    const sell = async () => {
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts' )
            window.w3 = new Web3(window.ethereum)
            var accounts = await window.w3.eth.getAccounts()
            account = accounts[0];
            console.log(account); // yeh woh account hai jo metamask mein hai
        }

        InsuraCoinContract.methods.approve(ShopAddress, 10000).send({
            from: accounts[0]
         })

        const requestSell = await ShopContract.methods.sellTokens(sellTokens).send({
        from: accounts[0],
        });
        console.log(requestSell);
        updateBalance();
    }

    const updateBalance = async () => {
        
        window.w3 = new Web3(window.ethereum)
        var accounts = await window.w3.eth.getAccounts()
        account = accounts[0];
        setBalance(await InsuraCoinContract.methods.balanceOf(account).call());
        setShopBalance(await ShopContract.methods.shopBalance().call())
        // console.log(ShopContract.methods.shopBalance().call())
        // console.log(balance);
    }


    useEffect(() => {
        if (ShopContract!=null){
            updateBalance();
        }
    }, [shopbalance ,balance]);

    
    return (
      <div>
          <div className="exchange__container">
              <div>
                <p> Shop balance - {shopbalance}</p>
                <p className='legendary-text'></p>
              </div>
              <div>
                  <input onChange={(event) => {setBuyTokens(event.target.value)}} type="number" placeholder="Amount of Wei" className="exchange__textBox" />
                  <button className="exchange__button" onClick={purchase}>
                      Purchase
                  </button>
              </div>

              <div>
                  <input onChange={(event) => {setSellTokens(event.target.value)}} type="number" placeholder="1 wei = 100 tokens" className="exchange__textBox" />
                  <button className="exchange__button" onClick={sell}>
                      Sell
                  </button>
              </div>
              <div>
                <p> User Balance - {balance}</p>
              </div>
          </div>
      </div>
  );
}
export default Shop;