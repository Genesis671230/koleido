import "./App.css";
import {  darkTheme, lightTheme,SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import React, { useEffect, useState } from "react";
import { ethers,VoidSigner } from "ethers";
import { utils } from "ethers";
import {Modal,ModalOverlay,Select,ModalContent,Box,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, useDisclosure} from '@chakra-ui/react';
import Third from "./Third";
import abi from "./Koleidoken.sol/Koleidoken.json";
import Second from "./Second";
import Fourth from "./Fourth";
import Five from "./Five";
import Six from "./Six";
import zIndex from "@mui/material/styles/zIndex";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let lightMode = false;
  // const providerForSwap = new ethers.providers.Web3Provider(jsonRpcEndpoint);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentChain, setChain] = useState("");
  const contractAddress = "0xfbdc9Cc5d87A957B65D0e456bC1c227234fe05e8";
  const contractABI = abi.abi;
  
  const [balance, setBalance] = useState("");
  
  
  // https://koleidoken-f0bb6.web.app/
    const jsonRpcEndpoint =  "https://mainnet.infura.io/v3/832b912552324b5087f85750df9852ea"
    const providerForSwap = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
  
  const checkIfWalletIsConnected = async () => {
    try { 
          const {ethereum} = window;
          if (!ethereum) {console.log("Get MetaMask!")}; 
          
          const accounts = await ethereum.request({ method: "eth_accounts" });
         
            setCurrentAccount(accounts[0]);
         
          const chain = await ethereum.request({method: 'eth_chainId'});
          setChain(chain);
       console.log(chain)
          const balanceOfWallet = await ethereum.request({method: 'eth_getBalance',params: [currentAccount, 'latest'] });
          const olo =  ethers.utils.formatEther(balanceOfWallet.toString());
          setBalance(olo)
         
           
        }

     catch(error){
       console.log(error)
      }
  };

  const connectWallet = async () => {
    try { 
        const {ethereum} = window;
        if (!ethereum) {alert("Get MetaMask!")}
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        }
    catch (error) {console.log(error)}

  };


  const mint = async () => {
    try {
        
      
      // const jsonRpcEndpoint =  "https://rinkeby.infura.io/v3/832b912552324b5087f85750df9852ea"
      
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer =  provider.getSigner();
        console.log(signer)
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const count = await wavePortalContract.mint(1,{
          value: ethers.utils.parseEther('0.000001')
        });
        await count.wait();
  
      
    } catch (error) {
      console.log(error);
    }
  };
  
   window.ethereum.on("accountsChanged",checkIfWalletIsConnected);
   window.ethereum.on("chainChanged",checkIfWalletIsConnected);
    
  // window.ethereum.removeListener("accountsChanged",checkIfWalletIsConnected);
  // window.ethereum.removeListener("chainChanged",checkIfWalletIsConnected);
    
  useEffect(() => {
    checkIfWalletIsConnected();
  },[]);




      const networks = {
        polygon: {
          chainId: `0x${Number(137).toString(16)}`,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "Matic",
            symbol: "Matic",
            decimals: 18,
          },
          rpcUrls: ["https://polygon-rpc.com/",
          "https://rpc-mainnet.matic.network",
          "https://matic-mainnet.chainstacklabs.com",
          "https://rpc-mainnet.maticvigil.com"
        ],
          blockExplorerUrls: ["https://polygonscan.com/"]
        },
        bsc: {
          chainId: `0x${Number(56).toString(16)}`,
          chainName: "Binance Smart Chain Mainnet",
          nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18
          },
          rpcUrls: [
            "https://bsc-dataseed2.defibit.io/",
            "https://bsc-dataseed3.defibit.io/",
            "https://bsc-dataseed4.defibit.io/",
            "https://bsc-dataseed2.ninicoin.io/",
            "https://bsc-dataseed3.ninicoin.io/",
            "https://bsc-dataseed4.ninicoin.io/",
            "https://bsc-dataseed1.binance.org/",
            "https://bsc-dataseed2.binance.org/",
            "https://bsc-dataseed3.binance.org/",
            "https://bsc-dataseed4.binance.org/",
            "https://bsc-dataseed.binance.org/",
            "https://bsc-dataseed1.defibit.io/",
            "https://bsc-dataseed1.ninicoin.io/"

        ],
          blockExplorerUrls: ["https://www.bscscan.com"]
        },
        ETH: {
          chainId: `0x${Number(1).toString(16)}`,
          chainName: "Ethereum Mainnet",
          nativeCurrency: {
                name:"Ether",
                symbol:"ETH",
                decimals: 18
              },
          rpcUrls: [
            
            "https://mainnet.infura.io/v3/"

        ],
          blockExplorerUrls: ["https://www.bscscan.com"]
        },
        
      }

      const switchNetwork = async(networkName)=>{
        
        await changeNetwork({networkName});
      };

      
    
      const changeNetwork = async({networkName})=>{
        try{
          if(!window.ethereum) throw new Error("No Crypto Wallet Found");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...networks[networkName]
              }
            ]
          });
        }catch (switchError) {
          console.log(switchError)
          }
      };

  return (
    
    <div className="App">
      <header className="App-header">
        <div className="ConnectWallet">
          
          <h3 style={{ cursor: "pointer" }}>
            Kaleido<span style={{ color: "red" }}>Port</span>{" "}
          </h3>
            
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>
            WhitePaper<span style={{ color: "red" }}></span>{" "}
          </h3>
            
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>
            MindMap<span style={{ color: "red" }}></span>{" "}
          </h3>
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>
            Staking<span style={{ color: "red" }}></span>{" "}
          </h3>
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>

            Team<span style={{ color: "red" }}></span>{" "}
          </h3>
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>

            {balance ? <p>{balance.slice(0,6)} </p>: "Balance"}{" "}<span style={{ color: "red" }}></span>{" "}
          </h3>
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>

            {currentChain ? <p>{currentChain}</p>: "ChainId"}{" "}<span style={{ color: "red" }}></span>{" "}
          </h3>
          <h3 style={{ cursor: "pointer", fontWeight: 500, fontSize: 16 }}>

       
          <button  onClick={()=>switchNetwork("bsc")}>BSC</button>
          <button  onClick={()=>switchNetwork("polygon")}>Polygon</button>
            <span style={{ color: "red" }}></span>{" "}
 
          </h3>
          
          <button onClick={connectWallet} className="button1">
            {!currentAccount ? <p>Connect Wallet</p> : (currentAccount.substring(0,6))}
          </button>
            
        </div>
      </header>

      <div className="main">
        <div className="imgheading">
          {/* <div className="text" style={{width:"30%"}}>
            <h2>
              Welcome to{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                Kaleidokens
              </span>{" "}
            </h2>
            <p>
              THE WORLD'S FIRST MISSION MARS NFT PROJECT. KALEIDOKEN represents
              a collection of 10,000 unique KALEIDOKENS categorized by level of
              rarity and generated with hundreds of elements. KALEIDOKENS are
              stored as ERC-721 tokens on the Ethereum blockchain and allow
              users to Experience Metaverse thats Based on VR and AR
              Fascilitating users to prepare for MARS.
            </p>
      
          </div> */}
          <div className="mars">
            
      
            {/* <div className="marsimage">
              <img src="mission.png" alt="" />
            </div>
            <div className="kaleido">
              <img src="mars.png" alt="Koleidoken" />
            </div> */}
          </div>
        </div>
        <div className="wrap-btn" style={{width:"100vw",display:"flex",justifyContent:"start",marginLeft:"20px"}}>

        <div className="btn-opensea" >
          <button
            onClick={() => {
              window.open(
                `https://opensea.io/collection/kaleidoken-kaptures`,
                "_blank"
                );
              }}
              >
            BUY FROM OPENSEA
          </button>
        </div>
        <div className="btn-discord">
          <button onClick={mint}>MINT A KALEIDOKEN</button>
        </div>
      
            </div>
<div className="modal" style={{marginTop:20}}>

<button onClick={onOpen} className="modal-btn" style={{marginTop:20}}>Swap</button>
      <Modal
       blockScrollOnMount={false}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay style={{background:"rgba(0,0,0,0.5)"}} />
        <ModalContent style={{opacity: 1,height: "100vh",transform: "none",display: "flex",justifyContent: "center",alignItems: "center"}}>
          <div style={{border:"none",background: "transparent",color: "white",fontSize: 25,width:550,marginBottom:10,display:"flex",justifyContent:"end"}}>

          <ModalCloseButton style={{ cursor:"pointer",border:"2px solid purple", background:"transparent", color:"purple",padding:10,borderRadius:5}}/>
          </div>
          <ModalBody style={{    display: "flex",justifyContent: "center",alignItems:" center"}}>
          <SwapWidget
      provider={window.ethereum}
      jsonRpcEndpoint={jsonRpcEndpoint}
      width={500}
      theme={lightMode ? lightTheme:darkTheme} // Custom width in pixels
      onConnectWallet={()=>VoidSigner}
      />
           
          </ModalBody>
    
        </ModalContent>
      </Modal>
      </div>
        {/* <button onClick={wave} className="button2">Mint NFT</button> */}
        {/* <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#8E2DE2', height: '20vh' }} />
          </Container> */}
      </div>
      <div className="second-content">
        <Second />
      </div>
      <div className="third-content">
        <Third />
      </div>
      <div className="fourth-content">
        <Fourth
          building="metabuild.webp"
          head="The City Hub"
          para="A perk of owning a city hub is collecting taxes on a daily basis from all residents in your city.

Each City Hub can be staked to earn Koleidoken or it can be leased to another player in exchange for a percentage of profits."
        />
      </div>
      <div className="fourth-content">
        <Fourth
          building="front.webp"
          head="The Pent House"
          para="Penthouses are residential real-estates that produce passive income in metaverse.

          PH can be staked and leased to earn  (Koleidoken) on a nightly or monthly basis. 
          
          You can also play mini-games in your PH and earn exclusive, limited-edition NFTs that you can equip your Edgerunner with. "
        />
      </div>
      <div className="fourth-content">
        <Fourth
          building="pent.webp"
          head="The Cyber Castle"
          para="Fight Fiat Fathers and defend your reality by going on missions in exchange .Play mini-games in your PH or outside and earn exclusive NFTs and massive rewards."
        />
      </div>
      <div className="five-content">
        <Five />
      </div>
      <div className="six-content">
        <Six />
      </div>
      
    
      
    
    </div>
  );
};

export default App;

