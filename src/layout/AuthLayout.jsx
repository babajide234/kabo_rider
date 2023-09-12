import React from 'react'
import Container from '../components/Container'
import { FaRegCaretSquareLeft } from 'react-icons/fa'
import Logo from '../assets/logo.png'
import { Link, Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <Container>
        <div className=" flex flex-col px-10 h-full justify-center items-center bg-default ">
              <img src={Logo} alt="" className=" w-[60%]" />
            <Outlet/>
        </div>
    </Container>
  )
}

export default AuthLayout