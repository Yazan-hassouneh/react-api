import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SendCode() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate(null)
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const onSubmitForm = async (e) => {
        e.preventDefault()
        const {data} = await axios.patch(`${process.env.REACT_APP_API_KEY}/auth/sendcode`, {email})
        if(data.message === "success") {
            navigate("/NewPassWord")
        }   
    }
    return (
        <div className='h-100 mt-5'>
            <h2 className='my-4'>Your Email</h2>
            <form className='py-3'  method='patch' onSubmit={onSubmitForm}>
                <input onChange={handleEmail}></input>
                <div className='mt-3'><button type='submit' className='btn btn-outline-primary'>send Code</button></div>
            </form>
        </div>
    )
}

export default SendCode