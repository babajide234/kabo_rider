import React from 'react'
import Container from '../components/Container'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <Container>
        <div className=" w-full h-screen bg-no-repeat bg-cover">
            <div className=" w-full h-2/4 flex flex-col justify-center items-center">
                <img src={Logo} alt="" className=" rounded-full w-1/3 mb-5" />
                <h2 className=" font-bold text-4xl text-primary"> Delivery Boy App</h2>
            </div>
            <div className=" flex flex-col justify-end items-center h-2/4 pb-10 px-10 ">
                <Link to='/login' className=' w-full flex justify-center items-center py-3 bg-primary rounded-[8px] text-white font-bold text-xl '>Login </Link>
            </div>
        </div>
    </Container>
  )
}

export default Landing