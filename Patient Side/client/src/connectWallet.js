import React from "react";
import Web3 from "web3";
function ConnectWallet() {
  const [error, setError] = React.useState(null);
  let web3

  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        web3 = new Web3(window.ethereum)
      } 
      catch (err) { //this was necessary to see, if user rejected the request
        // console.log(err.message)
        setError(err.message)
      }
    } else {
      //metamask is not installed
      alert('Please install MetaMask!')
    }
  }
  return (
    <section>
      <div>
        <button onClick={connectWalletHandler} className="btn"> Connect Wallet</button>
      </div>
      <div className = "danger-text">
        <p > {error} </p>    
      </div>
    </section>
  );
}

export default ConnectWallet;