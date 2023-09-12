import React from 'react'
import { SpinnerCircular } from 'spinners-react';
import loaderSlice from '../store/loaderStore';

const Loader = () => {
  const isLoading = loaderSlice((state) => state.isLoading)
  
  return (
    <div className={`w-full h-screen fixed top-0 left-0 bg-slate-100/25  justify-center items-center ${isLoading ? 'flex' : 'hidden'}`}>

        <SpinnerCircular 
            size={90} 
            thickness={180} 
            speed={100} 
            color="#0d0a63" 
            secondaryColor="rgba(0, 0, 0, 0.11)" 
        />
    </div>
  )
}

export default Loader