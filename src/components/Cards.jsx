import React, { useState } from 'react';

export const CardContent = ({title,children})=>{
    return(
      <div className=" flex flex-col mb-10 ">
        <div className=" flex justify-between mb-6">
          <h3 className=" font-thin text-xl capitalize">{title}</h3>
        </div>
        <div className=" bg-white w-full mx-auto px-[30px] py-[25px] rounded-[20px] flex flex-col">
          {children}
        </div>
      </div>
    )
  }