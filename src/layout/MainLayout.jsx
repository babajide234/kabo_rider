import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { BsArrowLeft } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { RiMenu2Line,RiNotification3Line,RiLogoutBoxRLine } from 'react-icons/ri'
import userSlice from '../store/userStore'

const Offline = ({status}) => {
  return (
    <div className={`w-full h-screen fixed top-0 left-0 bg-gray-900/60 z-40 flex ${ status ? 'hidden':''} `} ></div>
  )
}

const Nav = ({ open,openMenu })=>{
  return (
    <div className=" fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto rounded-2xl flex justify-between z-50 px-5 py-4 bg-white shadow-2xl">
        <button onClick={openMenu} className=' bg-white w-10 h-10 text-2xl font-bold rounded-full flex justify-center items-center'> <RiMenu2Line/> </button>

        {/* <label className="relative flex justify-between items-center group text-xl">
          <input type="checkbox" onChange={ open } className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
          <span className="w-20 h-11 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-[#8C2D29] after:w-9 after:h-9 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-9 group-hover:after:translate-x-1"></span>
        </label> */}
    </div>
  )
}
const Menu = ({ open,close })=>{
  const isLoggedIn = userSlice(state =>  state.isLoggedIn)
  const logout = userSlice(state =>  state.logout)

  const navigate = useNavigate();


  useEffect(() => {
    if(!isLoggedIn){
      navigate('/login');
    }
  }, [isLoggedIn])

  const log = ()=>{
    logout();
    toggleSidebar();
  }

  return (
    <div className={`fixed top-0 ${open ? 'w-3/4 px-10 py-20 left-0 ':' hidden w-0 -left-96'} overflow-hidden  bg-primary h-screen z-50 `}>
      <button onClick={close} className=" absolute top-5 right-5 w-10 h-10 flex justify-center items-center rounded-full bg-gray-900/10 text-white"><MdOutlineClose/></button>

      <div className=" flex flex-col justify-between w-full h-full">
        <div className="">
          <Link  to='/profile' className=' border-b border-solid border-white py-4 flex items-center text-white font-bold text-xl'> <span className=" mr-5"><RiNotification3Line/></span> Profile</Link>
          <Link  to='/orders' className=' border-b border-solid border-white py-4 flex items-center text-white font-bold text-xl'> <span className=" mr-5"><RiNotification3Line/></span> Orders</Link>
          <Link  to='/notifications' className=' border-b border-solid border-white py-4 flex items-center text-white font-bold text-xl'> <span className=" mr-5"><RiNotification3Line/></span> Notifications</Link>
        </div>
        {
          isLoggedIn ? 
          <button onClick={log} className='  py-4 flex items-center text-white font-bold text-xl' > <span className=" mr-5"><RiLogoutBoxRLine/></span> Logout</button>
          : <Link to='/login' className='  py-4 flex items-center text-white font-bold text-xl'> <span className=" mr-5"><RiLogoutBoxRLine/></span> Login</Link>

        }
      </div>
    </div>
  )
}

export const MainLayout = () => {
  const [ offline , setOfline ] = useState(true);
  const [ menu , setMenu ] = useState(false);

  return (
    <Container>
      <Nav open={()=>setOfline(!offline)} openMenu={()=>setMenu(!menu)} />
      <Menu open={menu} close={()=>setMenu(!menu)} />
       <Outlet/>
      <Offline status={offline} />
    </Container>
  )
}
