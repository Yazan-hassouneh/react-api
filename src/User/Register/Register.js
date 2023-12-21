import React from 'react'
import Input from '../../Shared/Input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const userValidationSchema = yup.object({
        name : yup.string().required("Name Is Required").min(2, "Name Must Be At least 2 Character").max(20),
        email : yup.string().required("Email Is Required").email(),
        password : yup.string().required().min(6, "Must Be At Least 6 Character")
    })
    const handleChangeFile = (e) => {
        formik.setFieldValue("image", e.target.files[0])
    }
    const onSubmit = async userInfo => {
        const formData = new FormData()
        formData.append("userName", userInfo.name);
        formData.append("email", userInfo.email);
        formData.append("password", userInfo.password);
        formData.append("image", userInfo.image);
        
        const {data} = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/signup`,formData)
        if(data.message === "success") {
            formik.resetForm();
            navigate("/")
        }       
    }
    const formik = useFormik({
        initialValues : {
            name: "",
            email : "",
            password : "",
            image : []
        },
        onSubmit,
        validationSchema : userValidationSchema
    })
    const data = [
        {
            id : 'userName',
            name : "name",
            type: "text",
            title : "User Name",
            value : formik.values.name
        },
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
            id : 'userImage',
            name : "image",
            type: "file",
            title : "Profile Image",
            onChange : handleChangeFile
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
        <div className='container py-3'>
            <h1 className='text-center my-3'>Register Page</h1>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                {
                    RenderInputs
                }
                <button type='submit' className='btn btn-primary' disabled={!formik.isValid}>Send</button>
            </form>
        </div>
    )
}

export default Register