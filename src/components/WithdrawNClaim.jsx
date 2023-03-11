import {React, useState} from 'react'
import {usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi'
import stakeContract_abi from "../utils/stakecontract_abi.json"

const WithdrawNClaim = () => {
    const [claim, setClaim] = useState();
 
    const { config: rewardClaim } = usePrepareContractWrite({
        mode: 'recklesslyUnprepared',
        address: '0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4',
        abi: stakeContract_abi,
        functionName: 'claimReward',
        args : [claim]
      })
      const { data: claimFunc, isLoading:claimIsLoading, write: claimReward } = useContractWrite(rewardClaim);
    
      async function handleClaim(e){
        e.preventDefault();
        claimReward();
      }
      const {data: ClaimWaitData, isLoading: ClaimWaitLoading} = useWaitForTransaction({
        hash: claimFunc?.hash,
        onSuccess(data) {
          console.log(data);
        },
        onError(error) {
          console.log(error);
        },
      })
    
    
      const { config: withdrawConfig } = usePrepareContractWrite({
        mode: 'recklesslyUnprepared',
        address: '0xf3D1b9E397B501E8A23ee0d1EF1980a39262C3c4',
        abi: stakeContract_abi,
        functionName: 'withdrawStaking',
      })
      const { data: withdrawFunc, isLoading: withdrawIsLoading, write: withdrawStaking } = useContractWrite(withdrawConfig);
      const {data: withDrawWaitData, isLoading: WithdrawWaitLoading} = useWaitForTransaction({
        hash: withdrawFunc?.hash,
        onSuccess(data) {
          console.log(data);
        },
        onError(error) {
          console.log(error);
        },
      })
    
    async function handleWithdraw(e){
        e.preventDefault();
        withdrawStaking();
        console.log(withdrawFunc)
    }
    
 
 
    return (
    <div className="grid grid-rows-1 xl:grid-flow-col md:grid-flow-row">
    <div className="container flex flex-col justify-items-center mb-20 mt-5 w-4/5 ml-24 pt-10 pb-28 space-y-8 px-8 shadow-xl shadow-cyan-500/50 rounded-lg col-span-3">
    <form onSubmit ={handleClaim}>
        <div className='flex flex-col'>
        <h1 className="text-3xl font-bold">Token Claim</h1>
      <label className='mt-9 font-sans-serif text-lg'>Claim Reward</label>
      <input className='mb-9 h-9 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500' type="text" placeholder="Claim amount" onChange={(e)=>setClaim(e.target.value)}/>
      <button className="px-7 py-2 border border-blue-300 rounded-lg" type="onSubmit">{claimIsLoading || ClaimWaitLoading ? "Claiming" : "Claim"}</button>
      </div>
    </form>
    <p className='text-red-700'>Click the button below to withdraw stake</p>
   <button className='w-2/5 text-red-700 px-7 py-2 border border-blue-300 rounded-lg' onClick={handleWithdraw}>{withdrawIsLoading || WithdrawWaitLoading ? "In Progress" : "WITHDRAW STAKE" }</button>
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

export default WithdrawNClaim