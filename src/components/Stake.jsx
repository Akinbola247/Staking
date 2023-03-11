import {React, useState, useEffect} from 'react'
import {usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead, useAccount} from 'wagmi'
import stakeContract_abi from "../utils/stakecontract_abi.json"
import daitoken_abi from "../utils/daitoken_abi.json"
import {MoonLoader} from "react-spinners";

const override = {
  display: "flex",
  margin: "0 50%",
  borderColor: "red",
};

const Stake = () => {
  const {address} = useAccount()
    const [stakeAmount, setStakeAmount] = useState()
    const [approvedAmount, setApprovedAmount] = useState();
    
    const { config: stakeprepare } = usePrepareContractWrite({
      mode: 'recklesslyUnprepared',
      address: '0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4',
      abi: stakeContract_abi,
      functionName: 'stake',
      args : [stakeAmount]
    })
    const { data:stakingFunc, isLoading: stakeIsLoadng,  write: stake } = useContractWrite(stakeprepare)
    
    
    const {data: rewardWaitData, isLoading: rewardWaitLoading} = useWaitForTransaction({
      hash: stakingFunc?.hash,
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    })
  

    const {data:allowInfo, isLoading: isAllowInfoLoading, isError: isAllowInfoError} = useContractRead({
      address: '0x5e4a42c567cA56eA429d87b0EDB8d438c329B7B9',
      abi: daitoken_abi,
      functionName: 'allowance',
      args : [address, '0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4'],
    })


    const { config: approveStake } = usePrepareContractWrite({
      mode: 'recklesslyUnprepared',
      address: '0x5e4a42c567cA56eA429d87b0EDB8d438c329B7B9',
      abi: daitoken_abi,
      functionName: 'approve',
      args : ['0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4', stakeAmount]
    })
    const { data:approveFunc, isLoading: approveIsLoadng,  write: approve } = useContractWrite(approveStake)

  
    async function handleStaking(e) {
      e.preventDefault();
      if(approvedAmount >= stakeAmount){
        stake();
      }else{
        approve();
      }
       
    }

  
  useEffect(() => { 
  if(allowInfo){
    setApprovedAmount(Number(allowInfo));
  }
  }, [allowInfo])
  
    
    return (<div>
     <div className='absolute '>
     {/* <MoonLoader color="#36d7b7" />  */}
      </div>
    <div className="grid grid-rows-1 xl:grid-flow-col md:grid-flow-row">
    <div className="container flex flex-col justify-items-center mb-20 mt-5 w-4/5 ml-24 pt-10 pb-28 space-y-8 px-8 shadow-xl shadow-cyan-500/50 rounded-lg col-span-3">
    <form onSubmit={handleStaking}>
      <div className='flex flex-col'>
          <h1 className="text-3xl font-bold">Stake DAIT Token</h1>
          <label className='mt-9 font-sans-serif text-lg'>Stake amount</label>
          <input className='mb-9 h-9 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500' type="text" placeholder="stake amount" onChange={(e)=>setStakeAmount(e.target.value)}/>
        <button className="px-7 py-2 border border-blue-300 rounded-lg" type="onSubmit">{approvedAmount >= stakeAmount ?  "Stake" : "Approve"}</button>
      </div>
      </form>
    </div>
    <div className="container ml-10">
       <h1 className="text-3xl w-4/5 px-24 mt-28 font-sans-serif ml-6">
         The Future of Staking
       </h1>
       <p className="flex justify-items-center align-middle w-4/5 px-24 mt-2 font-sans-serif ml-6">At vero eos et accusamus et iusto odio dignissimos..... </p>
     </div>
 </div> 
 </div>  
  )
}

export default Stake


// rewardWaitLoading || stakeIsLoadng