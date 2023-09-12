import { create } from "zustand";

const appSlice = create(
    (set, get) => ({
        app:'testing',
        setApp:(value)=> {
            set(state => ({ ...state, app: value }))
        }
    })
);

export default appSlice;