import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {MdArrowBackIosNew} from 'react-icons/md';
import { Link,Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';


const SideLayout = () => {
    let { query } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const segments = location.pathname.split("/");
    const resource = segments[1]; 


  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 2000 }}
        animate={{ x: 0 }}
        transition={{ duration: .3 }}
        className=" relative min-h-screen w-full ">
          <header className="py-6 w-full z-30 bg-default px-4 fixed top-0 left-0">
            <div className=" flex text-center items-center w-full relative">
                <button onClick={() => navigate('/map')} className=" text-xl font-bold absolute left-0 top-2  text-gray-900 w-5 h-5 flex justify-center"><MdArrowBackIosNew/></button>
                <h2 className=" capitalize flex-grow text-xl  font-bold">{ resource }</h2>
            </div>
          </header>
          <div className=" min-h-screen  flex flex-col bg-default mt-10">
              <Outlet/>
          </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SideLayout