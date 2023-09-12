import React,{ useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react'
import orderSlice from '../store/oderStore'
import userSlice from '../store/userStore'
import { FiPhone, FiHome } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const OrderDetails = () => {
  const { ref } = useParams()
  const getSingleOrder = orderSlice(state=> state.getSingleOrder)
  const order = orderSlice(state=> state.order)
  const token = userSlice(state=> state.token)
  const complete = orderSlice(state=> state.complete)
  const acceptOrder = orderSlice(state=> state.acceptOrder)

  const showDetails = () => {
    const data = {
        token: token,
        reference_code: ref,
        account: "rider", 
        from: "",
        to: "",
        payment_status: "", 
        order_status: "" 
      }
      getSingleOrder(data);
  }


  useEffect(()=>{
    showDetails();
  },[])

  const markDelivered = (ref)=>{
    const data = {
        token: token,
        status: "Delivered", 
        reference_code: ref,
        account: "rider" 
    }
    complete(data)
  }

  const handleAccept = (ref)=>{
    const data ={
        token,
        reference_code:[ref]
    }
    acceptOrder(data);
    // setOrderDetails(!orderDetails)
  }

  return (
      <div className=" w-full min-h-screen pt-10 px-8  relative">
          {
             order !== null  ? (
              <>
                  <div className=" mb-5">
                    <h2 className=" font-bold text-3xl">Great Job!</h2>
                    <p className=" text-md">Customer Information</p>
                  </div>
                  <div className="overflow-auto w-full h-full pb-20">
                      <h3 className=" mb-5 font-bold text-xl">Destination</h3>
                      <div className=" mb-5">

                                <div className=" flex items-center mb-10 relative">
                                    <span className=" after:h-10 after:border-l-4 after:border-dashed after:border-gray-300 after:absolute after:top-11 mr-5 w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">0</span>
                                    <h3 className=" w-4/5 font-bold capitalize text-gray-700">{order[0]?.store[0].name}</h3>
                                </div>
                                <div className=" flex items-center mb-7 relative">
                                    <span className=" mr-5 w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">0</span>
                                    <h3 className=" w-4/5 font-bold capitalize text-gray-700 whitespace-normal">{order[0].shipping[0].address}.</h3>
                                </div>
                      </div>
                      <h3 className=" font-bold text-xl mb-5">Delivery Information</h3>
                      <div className=" flex items-center w-full mb-3 border-b border-solid border-gray-300 py-5">
                                <div className=" mr-7 text-3xl text-gray-600">
                                    <FiPhone/>
                                </div>
                                <div className="">
                                    <h2 className="font-bold text-lg mb-2 capitalize">{order[0].customer[0].othernames} {order[0].customer[0].lastname}</h2>
                                    <h2 className="font-medium">{order[0].customer[0].phone}</h2>
                                </div>
                      </div>
                      <div className=" flex items-center w-full mb-3 border-b border-solid border-gray-300 py-5">
                                <div className=" mr-7 text-3xl text-gray-600">
                                    <FiHome/>
                                </div>
                                <div className="">
                                    <h2 className="font-bold text-lg mb-2">Delivery Address</h2>
                                    <h2 className="font-medium">{order[0].shipping[0].address}</h2>
                                </div>
                      </div>
                      <div className=" flex items-center w-full mb-3 border-b border-solid border-gray-300 py-5">
                                <div className=" mr-7 text-3xl text-gray-600">
                                    <FaRegStickyNote/>
                                </div>
                                <div className="">
                                    <h2 className=" font-bold text-lg mb-2">Delivery Note</h2>
                                    <h2 className=" font-medium">{order[0].shipping[0].details || 'No Notes'}</h2>
                                </div>
                      </div>
                      <div className=" mb-10">
                        {
                          order[0].order_status == 'Successful' ? (
                            <></>
                          ):(
                            
                            order[0].order_status == "Delivery" ? (
                              <button onClick={()=>markDelivered(order[0].reference_code)} className=' w-full mt-5 py-3 bg-primary rounded-full text-white font-medium text-xl'>Mark as Delivered </button>
                            ) : (
                              <button onClick={()=>handleAccept(order[0].reference_code)} className=' w-full mt-5 py-3 bg-primary rounded-full text-white font-medium text-xl'>Accept Order</button> 
                            )
                            
                          )
                        }
                      </div>
                  </div>
              </>
              ):(
                <div className="w-full h-full flex justify-center items-center">
                <SpinnerCircular
                    size={90} 
                    thickness={180} 
                    speed={100} 
                    color="rgba(172, 57, 59, 1)" 
                    secondaryColor="rgba(0, 0, 0, 0.11)" 
                    />
                </div>
              )
          }
      </div>
  )
}

export default OrderDetails