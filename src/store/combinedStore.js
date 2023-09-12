 
import { create } from "zustand";

import appSlice from './appStore'
import riderSlice from './riderStore'
import userSlice from './userStore'


const combinedStore = () => {
  const useCombinedStore = create((set) => ({
        ...riderSlice(),
        ...userSlice(),
        ...appSlice(),
  }));
  return combinedStore
}

export default combinedStore
