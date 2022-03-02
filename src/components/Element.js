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
    <div className="md:flex items-center justify-center min-h-screen ">
      <div className="z-10 grid justify-items-center rounded-md bg-blue-400">
        <form
          onSubmit={handleSet}
          className="md:flex flex-col max-w-2xl mx-auto border rounded-md shadow-md "
        >
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
              onChange={(e) => setInputVal(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-center">
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
        <button
          className="text-white p-1 border-2 w-1/3 m-5 hover:bg-indigo-500 hover:text-gray-300"
          onClick={handleGet}
          type="button"
        >
          Get the state
        </button>
        <h2>The state is: {getState}</h2>
      </div>
    </div>
  );
}

export default Element;

/*

Accounts:
(0) 0xb52ced97a894a2c148f2a78a25b01874408868c9
(1) 0x0db850aeaa535f35c566c0ea988f92b5c169148d
(2) 0xbd18c86ff6c519639a73fd58930b825b47c1fa41
(3) 0x22716baa1b99ce9c54c26429bbc3795b3b176ae9
(4) 0x70ce7a349604347e0b45553f07160b99bc88ec2f
(5) 0xc90438dee5edeed17573ac7b6e205b6b80e9813a
(6) 0x71f0e20065e3f031947746dbe9c6d0f08ea560f9
(7) 0xcaef9820c66485ca86c98c542409d17bdd62581f
(8) 0xf6aa4cf4b4b9a702c9dfbd1e1142fff9f59e45f3
(9) 0xc1414783c52de0b48d99704d68a7084003e29e15

Private Keys:
(0) be36635381707b41ccfa310ac02cc432c768e2c18e3e998187c122c4c2def3f8
(1) 721677c8a4e15cf5ea677e8be5f0162dba2dfcecb1ceb02ce7f28dd6e884105c
(2) bbd3943b733a440eb4377e143fa85eb00e79cde56b1c1e12ff7ee4bf41ad6980
(3) 05286cea3bb478ecf8f62b02d486ff1212b2f286649766a321411598689c95e6
(4) 0ec95deb02075015cf498539d0d9b835a89f961d2808f9cc26907a8a6bee968e
(5) f1473286dd6115a5426099dad4901dc927abe6b951618ed006d4bbca9425d11f
(6) 2c6b41ba3445a14724a01f80b2051aeff77771a0dab734d6f58daee56fe55609
(7) 315f23cdc46964727e4e8742ed386e0d53949deff4ac5d7a5ca3c20517b43fca
(8) 83e23da4a86b99b57f8fb6291424ccd423713d378e54483ba9c74ec7732b6e46
(9) 9352907b40f25d6006e780e533395a78920593a45b16b2d35ef4c02fe74ce09d

Mnemonic: cattle thrive month pipe artefact antenna fat pizza uphold advance critic journey

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)> truffle migrate --reset --compile-all

Compiling your contracts...
===========================
> Compiling ./contracts/ChangeStateInput.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Users/lorenzosyku/react-builds/cc-state-change-dapp/build/contracts
> Compiled successfully using:
   - solc: 0.4.26+commit.4563c3fc.Emscripten.clang



Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xe321298b3cdd91e0ee8489f7a1e519713129cc2fadb8680623d711979e10867a
   > Blocks: 0            Seconds: 0
   > contract address:    0xAA63623D97b3262ae6D701d6b71d275E5B82AdAC
   > block number:        1
   > block timestamp:     1646168187
   > account:             0xB52CED97A894A2C148F2A78a25B01874408868C9
   > balance:             99.998973476875
   > gas used:            304155 (0x4a41b)
   > gas price:           3.375 gwei
   > value sent:          0 ETH
   > total cost:          0.001026523125 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:      0.001026523125 ETH


2_deploy_contracts.js
=====================

   Deploying 'ChangeStateInput'
   ----------------------------
   > transaction hash:    0xcd7d102aa6ad689ba945c7d48f91864e5fbd9cccb82d3c40664fea9e0b59bf47
   > Blocks: 0            Seconds: 0
   > contract address:    0xdB00CD36BB23D263fDf6d1F1E87b1F15165EcCf8
   > block number:        3
   > block timestamp:     1646168187
   > account:             0xB52CED97A894A2C148F2A78a25B01874408868C9
   > balance:             99.998501681945991479
   > gas used:            101241 (0x18b79)
   > gas price:           3.179902189 gwei
   > value sent:          0 ETH
   > total cost:          0.000321936477516549 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000321936477516549 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.001348459602516549 ETH


*/
