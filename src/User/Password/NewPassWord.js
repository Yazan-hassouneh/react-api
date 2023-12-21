import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Shared/Input'

function NewPassWord() {
    const navigate = useNavigate(null)
    const uservalidationSchema = yup.object({
        email : yup.string().required("Email Is Requierd").email(),
        password : yup.string().required().min(6, "Must Be At Least 6 Character"),
        code : yup.string().required()
    })
    const onSubmit = async userInfo => {
        const {data} = await axios.patch(`${process.env.REACT_APP_API_KEY}/auth/forgotPassword`, userInfo)
        if(data.message === "success") {
            navigate("/")
        }   
    }
    const formik = useFormik({
        initialValues : {
            email: "",
            password : "",
            code : ""
        },
        onSubmit,
        validationSchema : uservalidationSchema
    })
    const data = [
        {
            id : 'userEmail',
            name : "email",
            type: "email",
            title : "User Email",
            value : formik.values.email
        },
        {
            id : 'userPassword',
            name : "password",
            type: "password",
            title : "User password",
            value : formik.values.password
        },
        {
            id : 'code',
            name : "code",
            type: "text",
            title : "code",
            value : formik.values.code
        },
    ]
    const RenderInputs = data.map((item, i) => 
            <Input 
                key={i}
                id={item.id} 
                title={item.title} 
                name={item.name} 
                type={item.type} 
                value={item.value}
                errors={formik.errors}
                onChange={item.onChange || formik.handleChange}
                onBlur={formik.handleBlur}
                ontouch={formik.touched}
            ></Input>
            )
    return (
        <div className='h-100 mt-5 container'>
            <h2 className='my-4'>Your Email</h2>
            <form className='p-4 w-auto m-auto' onSubmit={formik.handleSubmit}>
                {
                    RenderInputs
                }
                <div className='mt-3'><button type='submit' className='btn btn-outline-primary'>Save</button></div>
            </form>
        </div>
    )
}

export default NewPassWord