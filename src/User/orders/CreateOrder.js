import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from 'yup'
import Input from '../../Shared/Input'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from '../../Context/CartContext'
import Loading from '../Shared/Loading'
import { useNavigate } from 'react-router-dom'

function CreateOrder() {
    const {getCartItems} = useContext(cartContext)
    const navigate = useNavigate()

    const [Total, setTotal] = useState(0)
    const {data, isLoading} = useQuery({queryKey: ["cart"], queryFn: async () => {
        await getCartItems()
        await data.data.products.map((item) => 
            setTotal((prev) => prev += (item?.details.finalPrice * item?.quantity))
        )
        return data
    }})
    const userValidationSchema = yup.object({
        couponName : yup.string().min(3, "Name Must Be At least 2 Character").max(20),
        address : yup.string().required("Address Is Required").min(3).max(40),
        phone : yup.string().required("Phone Is Required").min(8).max(13)
    })
    const onSubmit = async (userInfo) => {
        const Token = localStorage.getItem("userToken")
        const data = await axios.post(`${process.env.REACT_APP_API_KEY}/order`, userInfo, {headers : {Authorization : `Tariq__${Token}`}})
        if(data.status === 201) {
            navigate("UserOrders")
        }
    }
    const formik = useFormik({
        initialValues : {
            couponName : "rtsde",
            address : "",
            phone : ""
        },
        onSubmit,
        validationSchema : userValidationSchema
    })
    const info = [
        {
            id : 'couponName',
            name : "couponName",
            type: "text",
            title : "coupon Name",
            value : formik.values.couponName
        },
        {
            id : 'address',
            name : "address",
            type: "text",
            title : "User Address",
            value : formik.values.address
        },
        {
            id : 'phone',
            name : "phone",
            type: "phone",
            title : "User Phone",
            value : formik.values.phone
        },
    ]
    const RenderInputs = info.map((item, i) => 
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
    if(isLoading) {
        return(
            <Loading></Loading>
        )
    }
    return (
        <div className='container py-3'>
            <h1 className='text-center my-3'>Create Order</h1>
            <div className='my-3'><span className='fw-bold'>Total : </span> <span>{Total}</span></div>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                {
                    RenderInputs
                }
                <button type='submit' className='btn btn-primary' disabled={!formik.isValid}>Create</button>
            </form>
        </div>
    )
}

export default CreateOrder