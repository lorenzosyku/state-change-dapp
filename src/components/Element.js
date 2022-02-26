import { useState } from "react";
import Web3 from "web3";
import { changeStateInput } from "../abi/abis";

const web3 = new Web3(web3.givenProvider);
const contractAddr = "0xac712CA6b82e2eE44df82e4730D4f53Aeff874f1";
const changeState = new web3.eth.Contract(changeStateInput, contractAddr);

function Element() {
  const [inputVal, setInputVal] = useState(0);
  const [getState, setGetState] = useState("click to refresh");

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
  };

  //write data to the blockchain

  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await changeState.methods.set(inputVal).estimatedGas();
    const result = await changeState.methods.set(inputVal).send({
      from: account,
      gas,
    });
  };

  return (
    <div className="md:flex items-center justify-center min-h-screen ">
      <div className="z-10 grid justify-items-center rounded-md bg-blue-400">
        <form className="md:flex flex-col max-w-2xl mx-auto border rounded-md shadow-md ">
          <label className="block mb-5 px-5 space-y-5">
            <span className="text-white font-semibold italic text-xl py-5">
              CHANGE THE STATE FROM 0 TO ANOTHER NUMBER
            </span>
            <input
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="number"
              placeholder="0"
              id="state"
              value={inputVal}
              name="stateInput"
              onChange={(e) => setGetState(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-center">
            <button
              className="text-white p-1 border-2 w-1/3 m-5 hover:bg-indigo-500 hover:text-gray-300"
              onClick={handleGet}
              type="button"
            >
              Get the state
            </button>
            <button
              className="text-white p-1 border-2 w-1/3 m-5 hover:bg-blue-500 hover:text-gray-300"
              onClick={handleSet}
              type="button"
            >
              Update the state
            </button>
          </div>
        </form>
      </div>

      <br />
      <div className="">
        <h2>The state is: {getState}</h2>
      </div>
    </div>
  );
}

export default Element;
