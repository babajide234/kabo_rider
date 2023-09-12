import { Formik } from 'formik'
import React,{ useEffect, useState}from 'react'
import Inputs from '../../components/Inputs';
import userSlice from '../../store/userStore';
import loaderSlice from '../../store/loaderStore';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const login = userSlice((state) => state.login)
    const isLoggedIn = userSlice((state) => state.isLoggedIn)
    const isLoading = loaderSlice((state) => state.isLoading)
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values) => {
        const data = {
            email:values.email,
            passcode:values.password
        }
        login(data);
    }

    useEffect(() => {
        isLoggedIn && navigate('/map')
    }, [isLoggedIn])
    
  return (
    <div className=" w-full ">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({isSubmitting, values, handleSubmit,handleChange})=>(
                <form onSubmit={handleSubmit}>
                    <Inputs 
                        value={values.email} 
                        onChange={handleChange}
                        name='email'
                        type="email"
                        placeholder={'Email'}
                    />
                    <Inputs 
                        value={values.password} 
                        onChange={handleChange}
                        name='password'
                        type="password"
                        placeholder={'Password'}
                    />

                    <button type='submit'  className=' w-full py-3 bg-primary rounded-[8px] text-white font-semibold text-xl'>Login</button>
                </form>
            )}
        </Formik>
        <Loader/>
    </div>
  )
}

export default Login