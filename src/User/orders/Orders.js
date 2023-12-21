import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Shared/Loading'

function Orders() {
    const [orders, setOrders] = useState([])
    const [load, setLoad] = useState(true)
    const getOrders = async () => {
        const Token = localStorage.getItem("userToken")
        const {data} = await axios.get(`${process.env.REACT_APP_API_KEY}/order`, {headers : {Authorization : `Tariq__${Token}`}} ) 
        console.log(data)
        setOrders(data.orders)
        if(data.message === "success") {
            setLoad(false)
        }
    }
    useEffect(() => {
        getOrders()
    },[])
    if(load) {
        return(
            <Loading></Loading>
        )
    }
    return (
        <div className='container py-4'>
            {
                orders.map((order, i) => 
                    <div className='mt-5 overflow-x-scroll' key={i}>
                        <h4 className='my-2'>Order - {i+1}</h4>
                        <table className='table table-striped table-bordered mt-2 orderTable'>
                            <thead>
                                <tr>
                                    <th>address</th>
                                    <th>finalPrice</th>
                                    <th>phoneNumber</th>
                                    <th>status</th>
                                    <th>products</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >{order.address}</td>
                                    <td>{order.finalPrice}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td className={`${order.status === 'deliverd' ? 'bg-success text-white' : 'bg-warning text-black'}`}>{order.status}</td>
                                    <td>
                                        <ol>
                                            {order.products.map((product,i) =>
                                            <li className='text-start' key={i}>{product.name}</li>
                                            )}
                                        </ol>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default Orders