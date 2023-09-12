import { create } from "zustand";
import { getOrders, acceptOrders, completeOrder } from "../api/request";
import loaderSlice from './loaderStore';
import userSlice from "./userStore";

const orderSlice = create(
    (set, get) => ({
        orders:[],
        order:null,
        requests:null,
        successfullOrders:null,
        setOrder:(value)=> {
            getOrders(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    set(state => ({ ...state, orders: res.data.data }))
                    // loaderSlice.setState({ message: res.data.message });
                    // loaderSlice.setState({ type: res.data.status });
                } else{
                    // loaderSlice.setState({ message: res.data.message });
                    // loaderSlice.setState({ type: res.data.status });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        },
        acceptOrder:(value)=>{
            acceptOrders(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    const { token } = userSlice.getState();
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                    get().setOrder({
                        token,
                        account:'rider'
                    })
                    get().getSingleOrder({
                        token: token,
                        status: "Delivered", 
                        reference_code: value.reference_code,
                        account: "rider" 
                    })
                } else{
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        },
        getSingleOrder:(value)=>{
            getOrders(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    set(state => ({ ...state, order: res.data.data }))
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                } else{
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        },
        complete:(value)=>{
            completeOrder(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    const { token } = userSlice.getState();

                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                    get().setOrder({
                        token,
                        account:'rider'
                    })
                } else{
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        },
        getRequests:(value)=>{
            getOrders(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    set(state => ({ ...state, requests: res.data.data }))
                } else{
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        },
        getSuccessOrders:(value)=>{
            getOrders(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    set(state => ({ ...state, successfullOrders: res.data.data }))
                } else{
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        }
    })
);

export default orderSlice;