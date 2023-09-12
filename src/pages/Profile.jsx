import { Formik } from 'formik'
import React, { useState } from 'react'

import { BsArrowBarRight, BsCaretRight, BsPencil, BsTrash } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'
import { CardContent } from '../components/Cards'
import Inputs from '../components/Inputs'
import { Modal } from '../components/Modal'
import userSlice from '../store/userStore'
import * as yup from 'yup';

const Profile = () => {
    const [modal, setModal] = useState(false)
    const [password, setPassword] = useState(false)

    const validationSchema = yup.object().shape({
        password: yup.string().required().min(5),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
      });

    const updateName = userSlice(state=> state.updateName);
    const updatePwd = userSlice(state=> state.updatePwd);
    const token = userSlice(state=> state.token);
    const details = userSlice(state=> state.details);

    const onNameSubmit = (values)=>{
        const data ={
            token:token,
            lastname: values.lastname,
            othernames:values.othername
        }
        updateName(data)
    }
    const onPwdSubmit = (values)=>{

        const data ={
            token:token,
            password: values.password,
        }

        updateName(data)
    }
    const closeModal = ()=>{
        setModal(!modal)
    }
  return (
    <div className=" flex flex-col px-[20px] py-10 min-h-screen">

        <h2 className=" font-thin text-4xl mb-10">My profile</h2>

        <CardContent
                title='Personal details'
        >
            <div className=" w-full flex flex-col justify-center items-center">
                        
                
                <div className=" w-full">
                    <h2 className=" font-bold text-xl"></h2>
                    <div className="flex justify-between">
                        <div className="">
                            <h3 className=" text-base font-bold">Change Name</h3>
                            <p className="">{details.othernames} {details.lastname}</p>
                        </div>
                        <button className=' w-6 h-6 rounded-full ' onClick={()=>setModal(!modal)}  ><BsPencil/></button>
                    </div>
                    <h3 className="text-base"></h3>

                    <span className=" w-full block my-3 border-b border-solid "></span>

                    <div className="flex justify-between">
                        <div className="">
                            <h3 className=" text-base font-bold">Change Password</h3>
                            <p className="">****</p>
                        </div>
                        <button className=' w-6 h-6 rounded-full ' onClick={()=>setPassword(!password)} ><BsPencil/></button>
                    </div>
                </div>
            </div>
        </CardContent>

        <Modal title={'Change Name'} open={modal} close={closeModal} >
                <Formik initialValues={{lastname:"",othername:""}} onSubmit={onNameSubmit}>

                    {(props)=>(
                        <form onSubmit={props.handleSubmit}>
                            <Inputs name="lastname" placeholder={'LastName'} value={props.values.lastname} onChange={props.handleChange} />
                            <Inputs name="othername" placeholder={'Othername'} value={props.values.othername} onChange={props.handleChange} />
                            <button  
                                type='submit' 
                                className='w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'

                            >{ "Update"}</button>
                        </form>
                    )}                                                                                            
                </Formik>
        </Modal>
        <Modal title={'Change Password'} open={password} close={()=>setPassword(!password)} >
                <Formik 
                    initialValues={{password:"",confirm:""}} 
                    validationSchema={validationSchema}
                    validateOnMount={true}
                    onSubmit={onPwdSubmit}
                >
                    {(props)=>(
                        <form onSubmit={props.handleSubmit}>
                            <Inputs name="password" placeholder={'Password'} value={props.values.lastname} onChange={props.handleChange} />
                            <Inputs name="confirm" placeholder={'Confirm Password'} value={props.values.othername} onChange={props.handleChange} />
                            <button  
                                type='submit' 
                                className={`w-full py-4 flex justify-center items-center text-lg font-bold rounded-full ${props.isValid ? 'bg-primary':' bg-slate-600'}  text-default`}
                                disabled={props.isSubmitting || !props.isValid}
                            >{ "Update"}</button>
                        </form>
                    )}                                                                                                           
                </Formik>
        </Modal>
    </div>
  )
}

export default Profile