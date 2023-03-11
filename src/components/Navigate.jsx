import React from 'react'
import { Link } from "react-router-dom";
import { Tab } from '@headlessui/react'

const Navigate = () => {
    const tabs= ["Dashboard", "Stake", "Withdraw"]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  return (
    <div className='w-full flex justify-center my-8'>
        <Tab.Group className='w-3/5' >
      <Tab.List className="flex justify-center rounded-xl bg-slate-700 p-1 ">
        {tabs.map((item)=>{
            return <Link to={`/${item}`}><Tab className={({ selected }) =>
                classNames(
                  'w-3/5 rounded-lg py-2.5 text-base font-medium leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none mx-20 focus:ring-2',
                  selected
                    ? 'bg-slate-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>{item}</Tab></Link>
        })}
      </Tab.List>
    </Tab.Group>
        

        
    </div>
  )
}

export default Navigate