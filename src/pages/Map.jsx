import React, { useState,useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
// import { useGeolocated } from "react-geolocated";
import useGeolocation from "react-hook-geolocation";
import useCombinedStore from '../store/combinedStore';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService  } from '@react-google-maps/api';
import { FiPhone, FiHome } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

import orderSlice from '../store/oderStore';
import userSlice from '../store/userStore';
import loaderSlice from '../store/loaderStore';
import { SpinnerCircular } from 'spinners-react';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {

    const orders = orderSlice(state=> state.orders)
    const order = orderSlice(state=> state.order)
    const acceptOrder = orderSlice(state=> state.acceptOrder)
    const getSingleOrder = orderSlice(state=> state.getSingleOrder)
    const complete = orderSlice(state=> state.complete)
    const token = userSlice(state=> state.token)
    const updateLocation = userSlice(state=> state.updateLocation)
    const isLoading = loaderSlice(state=> state.isLoading)
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBP36yIMHK0Fk1EFDoRNt_nLqadIm5wlMc"
    })
    
    
    const {
        app,
        setApp
    } = useCombinedStore();

    const [ lng , setLng ] =  useState(0);
    const [ lat , setLat ] =  useState(0);
    const [ showOrder , setShowOrder ] =  useState(false);
    const [ orderDetails , setOrderDetails ] =  useState(false);
    const [ currentRef , setCurrentRef ] =  useState(null);

  

    const geolocation = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 10000,
    });


    

    useEffect(() => {
        if(!geolocation.error){
            setLng(geolocation.longitude);
            setLat(geolocation.latitude);
        }
    }, [geolocation])

    useEffect(() => {
        const interval = setInterval(() => {
          // call updateLocation function every 2 minutes with current geolocation data
          updateLocation({
            token,
            longitude: lng,
            latitude:lat,
            address:"",
          });
        }, 60000);
    
        // clear interval on unmount
        return () => clearInterval(interval);
      }, [lat, lng]);


    const defaultProps = {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 20
    };

    
    const center = {
        lat: lat,
        lng: lng
    };

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    const options = {
        disableDefaultUI: true,
    };

    const openOrder = ()=>{

    }

    const handleAccept = (ref)=>{
        const data ={
            token,
            reference_code:[ref]
        }
        acceptOrder(data);
        // setOrderDetails(!orderDetails)
    }

    const showDetails = (ref)=>{
        const data  ={
            token: token,
            reference_code: ref,
            account: "rider", 
            from: "",
            to: "",
            payment_status: "", 
            order_status: "" 
          }
          getSingleOrder(data);
        setOrderDetails(!orderDetails)
    }

    const markDelivered = (ref)=>{
        const data = {
            token: token,
            status: "Delivered", 
            reference_code: ref,
            account: "rider" 
        }
        complete(data)
    }

  return (
    <div className=" h-screen w-full ">

        {
            isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                    options={options}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <>
                    <Marker
                        position={center}
                    />
                    </>
                    
                </GoogleMap>
            ): <></>
        }
        
        <div className={`w-11/12  mx-auto px-5 py-5 rounded-2xl absolute bottom-5 left-5 shadow-lg z-40 bg-white flex flex-col`}>
            
            <div onClick={()=>setShowOrder(!showOrder)} className=" flex justify-between items-center  py-2">
                <h2 className=" font-bold text-lg ">{showOrder ? 'Orders' : 'Requests'}</h2>
                <span className=" w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">
                    { orders ? orders.length : '0' }
                </span>
            </div>

            <div className={` overflow-hidden ${ showOrder ? 'min-h-2/4 pt-10' : 'h-0 '}`}>
                {
                    orders ? 
                        orders ?.map((item)=>(
                            <div key={item.reference_code} className="flex py-10 px-4 mb-5 last-of-type:mb-0 rounded-xl border border-solid border-gray-300 relative">
                                <div className=" bg-gray-200 w-20 h-15 rounded-lg mr-3"></div>
                                <div className=" flex flex-col">
                                    <h2 className=" font-bold text-sm">New Order- {item.store[0].name}</h2>
                                    <p className=" text-sm font-semibold">
                                        <span className=" text-primary">Destination: </span> 
                                        {
                                            item.shipping[0].address
                                        }
                                    </p>
                                </div> 
                                {
                                    item.order_status == "Delivery" ? 
                                    <Link to={`/orders/${item.reference_code} `}  className=' bg-primary text-white rounded-lg absolute bottom-2 right-2 px-2 py-1'>View Details</Link> 
                                    :<button onClick={()=>handleAccept(item.reference_code)} className=' bg-primary text-white rounded-lg absolute bottom-2 right-2 px-2 py-1'>Accept Order</button> 
                                }
                            </div>
                        ))
                    : (
                        <div className=" text-center w-full"> No Request</div>
                    )
                }
            </div>
        </div>

        <div className={` ${orderDetails ? 'flex':'hidden'} w-full h-screen bg-gray-900/50 fixed top-0 left-0 z-50  items-end`}>
            <div className=" w-full h-[90%] bg-white rounded-tl-3xl rounded-tr-3xl pt-10 px-8  relative">
                <button onClick={()=>setOrderDetails(false)} className=" absolute top-5 right-5 w-10 h-10 flex justify-center items-center rounded-full bg-slate-200"><MdOutlineClose/></button>
                <div className=" mb-5">
                    <h2 className=" font-bold text-3xl">Great Job!</h2>
                    <p className=" text-md">Customer Information</p>
                </div>
                {
                    order !== null  ? (
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
                                <button onClick={()=>markDelivered(order[0].reference_code)} className=' w-full mt-5 py-3 bg-primary rounded-full text-white font-medium text-xl'>Mark as Delivered </button>
                            </div>
                        </div>
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
        </div>
    </div>
  )
}

export default Map