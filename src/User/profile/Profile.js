import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../Shared/Loading'

function Profile() {
    const Token = localStorage.getItem("userToken")
    const {data, isLoading} = useQuery({queryKey: ["userInfo"], queryFn : async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_KEY}/user/profile`, {headers: {Authorization: `Tariq__${Token}`}})
        return data
    }})
    if(isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='container mt-3 py-4'>
            <div className='row'>
                <div className='col-12 col-md-5'>
                    <img src={data?.user.image.secure_url} alt='Profile Pic' className='img-fluid'></img>
                    <p><b>Created At :</b> {data?.user?.createdAt.slice(0, 10)}</p>
                </div>
                <div className='col-12 col-md-6 pt-5 text-start'>
                    <p><b>User Name : </b> {data?.user?.userName}</p>
                    <p><b>User Email : </b> {data?.user?.email}</p>
                    <p><b>User status : </b> {data?.user?.status}</p>
                    <p><b>User role : </b> {data?.user?.role}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile