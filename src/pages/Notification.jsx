import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import userSlice from '../store/userStore'
import { MdRequestQuote } from 'react-icons/md'
const Notification = () => {
  const notify = userSlice((state)=>state.notify)

  return (
    <div className=" w-full min-h-screen flex flex-col ">
      <div className=" px-10 h-40 bg-primary flex justify-between items-center w-full">
        <Link to='/map' className=' bg-white rounded-full w-10 h-10 justify-center items-center text-gray-900  flex font-bold text-2xl'> 
          <BsArrowLeft/> 
        </Link>
        <h2 className=" font-bold text-white text-2xl">Notifications</h2>
      </div>
      <div className=" px-4 py-10">
          {
            notify ? 
            notify.orders.map((item)=>(
              <Link to={`/orders/${ item.reference_code }`} className=" flex items-center px-3 py-3 shadow-lg " key={item.reference_code}>
                  <div className=" text-4xl mr-6 text-primary">
                    <MdRequestQuote/>
                  </div>
                  <div className="">
                      { item.address }
                  </div>
              </Link>
            )) : (
              <div className=" w-full h-full flex items-center justify-center">
                  <h2 className=" text-lg font-semibold capitalize"> No Notifications</h2>
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Notification