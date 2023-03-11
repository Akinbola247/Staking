import {React, useState, useEffect} from 'react'
import stakeContract_abi from "../utils/stakecontract_abi.json"
import { useContractRead, useAccount} from 'wagmi'

const Dashboard = () => {
    const {address} = useAccount();
    const [rewardData, setRewardData] = useState();
    const [stakeData, setStakeData] = useState();
    const [stakeStatus, setStakeStatus] = useState();


    const {data:rewardInfo, isLoading: isRewardInfoLoading, isError: isRewardInfoError} = useContractRead({
        address: '0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4',
        abi: stakeContract_abi,
        functionName: 'calculateReward',
      })
      
      const {data:stakeInfo, isLoading: isStakeinfoLoading, isError: isStakeInfoError} = useContractRead({
        address: '0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4',
        abi: stakeContract_abi,
        functionName: 'userInfo',
        args : [address]
      });



      useEffect(() => {
        if(rewardInfo){
          setRewardData(Number(rewardInfo._hex))
        }
        if(stakeInfo){
          setStakeData(Number(stakeInfo.amount._hex));
          setStakeStatus(stakeInfo.stakeStatus)
        }
      }, [rewardInfo, stakeInfo]);


  return (
    <div className="grid grid-rows-1 xl:grid-flow-col md:grid-flow-row">
    <div className="container flex-col justify-items-center mb-20 mt-5 w-4/5 ml-24 pt-10 pb-28 space-y-8 px-8 shadow-xl shadow-cyan-500/50 rounded-lg col-span-3">
         <h1 className="text-3xl font-bold">Dashboard</h1>
         <div className="ml-16 space-y-6 font-sans-serif text-lg ">
         <h1>Reward balance: {rewardData ?? "0"} </h1>
         <h1>Staking : {stakeData ?? "0"} </h1>
         <h1 style={(stakeStatus ?? false) ? {color : "green"} : {color : "red"} ?? null}>Stake Status : {stakeStatus ?? false ? "Active" : "Inactive"} </h1>
         </div>   
     </div>
     <div className="container ml-10">
       <h1 className="text-3xl w-4/5 px-24 mt-28 font-sans-serif ml-6">
         The Future of Staking
       </h1>
       <p className="flex justify-items-center align-middle w-4/5 px-24 mt-2 font-sans-serif ml-6">At vero eos et accusamus et iusto odio dignissimos..... </p>
     </div>
    </div>
  )
}

export default Dashboard