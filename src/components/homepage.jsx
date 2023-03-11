import React from 'react'
import Navbar from './navbar'

const homepage = () => {
  return (
    <div className="grid grid-rows-1 xl:grid-flow-col md:grid-flow-row">
    <div className="container flex-col justify-items-center mb-20 mt-5 w-5/5 pt-10 pb-28 space-y-8 px-8 shadow-xl shadow-cyan-500/50 rounded-lg ml-7 ">
         <h1 className="text-3xl font-bold">Home</h1>
         <div className="mx-5 space-y-4 font-sans-serif text-lg flex justify-between ">
    
         <div >
         <h1 className='text-9xl mt-6'>$180M </h1>
         <p>Total amount in pool accrued in purse over <br/>the course of 5 months.....</p>
         </div>

         <div>
         <h1 className='text-9xl'>$250M </h1>
         <p>Total reward paid out of our pools <br/>over the course of 6 months.....</p>
         </div>

         <div>
         <h1 className='text-9xl'>$600M </h1>
         <p>Our liquidity pool accumulated over <br/>the course of 2 years.....</p>
         </div>
         </div>   
     </div>
     </div>
  )
}

export default homepage