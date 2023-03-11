import React from 'react'
import Connect from "./Connect";
import {Link} from "react-router-dom"

const navbar = () => {
  return (
    <nav className="flex justify-between mt-10 mx-16 ">
    <h1 className="font-bold text-4xl">STAKE </h1>
    <div className="hidden md:flex font-bold text-base absolute left-52">
      <Link to={'/home'} className="mx-6">Home</Link>
      <a href="" className="mx-6">Features</a>
      <a href="" className="mx-6">About</a>
    </div>
    
    <div>
    <Connect />
    </div>
    </nav>
  )
}

export default navbar