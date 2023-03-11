import {React} from "react";
import Dashboard from "./Dashboard";
import StakeNWithdraw from "./Stake";
import Navigate from "./Navigate";
import WithdrawNClaim from "./WithdrawNClaim";
import Homepage from "./homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAccount } from 'wagmi'

import Navbar from "./navbar";

function App() {
  const { address, isConnecting, isDisconnected } = useAccount()

  return (
   <div>  
    <BrowserRouter>
        <Navbar/>
        <Navigate />
        
       
  
        <Routes>
        <Route path="/"  element={<Homepage />} />
        <Route path="/home"  element={<Homepage />} />
        <Route path="/Dashboard" element={isDisconnected ? <Homepage/> : <Dashboard/>} />
        <Route path="/Stake" element={<StakeNWithdraw />} />
        <Route path="/Withdraw" element={<WithdrawNClaim />} />
      </Routes>
    </BrowserRouter>
       
        
  </div>
  );
}

export default App;
