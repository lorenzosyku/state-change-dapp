import React from "react";
import { useState } from "react";
import Web3 from "web3";
import { changeStateInput } from "../abi/abis";

const web3 = new Web3(Web3.givenProvider);
const contractAddr = "0xdB00CD36BB23D263fDf6d1F1E87b1F15165EcCf8";
const changeState = new web3.eth.Contract(changeStateInput, contractAddr);

function Element() {
  const [inputVal, setInputVal] = useState(0);
  const [getState, setGetState] = useState("click to refresh");

  //check if a web3 instance is running on port:9545
  const web3Check = new Web3();
  web3Check.setProvider(
    new Web3.providers.WebsocketProvider("ws://localhost:9545")
  );
  web3Check.eth.net
    .isListening()
    .then(() => console.log("connection successful"))
    .catch((e) => console.log("no connection" + e));

  //read data from blockchain
  const handleGet = async (e) => {
    e.preventDefault();
    const result = await changeState.methods.get().call();
    setGetState(result);
    console.log(result);
  };

  //write data to the blockchain
  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    //const gas = await changeState.methods.set(inputVal).estimatedGas();
    const result = await changeState.methods.set(inputVal).send({
      from: account,
      //gas,
    });
    console.log(result);
  };

  return (
    <div className="conteiner">
      <div className="smCont">
        <form onSubmit={handleSet} className="form">
          <label className="lab">
            <span className="intro">
              CHANGE THE STATE FROM 0 TO ANOTHER NUMBER
            </span>
            <input
              className="inp"
              type="number"
              placeholder="0"
              id="state"
              value={inputVal}
              name="stateInput"
              onChange={(e) => setInputVal(e.target.value)}
            />
          </label>
          <div className="btnConteiner">
            <button className="btn" onClick={handleSet} type="button">
              Update the state
            </button>
            <button className="btn" onClick={handleGet} type="button">
              Get the state
            </button>
          </div>
        </form>
        <br />
        <div className="intro">
          <h2>The state is: {getState}</h2>
        </div>
      </div>
    </div>
  );
}

export default Element;

