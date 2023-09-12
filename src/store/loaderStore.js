import { create } from "zustand";

const loaderSlice = create((set) => ({
  isLoading: false,
  message:'',
  type:'',
  setIsLoading: (isLoading) => set((state) => ({ ...state,  isLoading  })),
  setMessage: (message) => set((state) => ({...state, message })),
  setType: (type) => set((state) => ({...state, type })),
  clear:()=>{
    set((state) => ({ isLoading:false, message:'', type:'' }))
  }
}));

export default loaderSlice;