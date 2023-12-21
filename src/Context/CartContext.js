import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const cartContext = createContext(null)

function CartContextProvider({children}) {
    const [CartItemsCount, setCartItemsCount] = useState(0)
    const addToCartContext = async (productId) => {
        try {
            const Token = localStorage.getItem("userToken")
            const {data} = await axios.post(`${process.env.REACT_APP_API_KEY}/cart`, {productId}, {headers:{Authorization: `Tariq__${Token}`}})
            toast.success("Item Added Successfuly", {
                position: toast.POSITION.TOP_RIGHT
            });
            return data
        }catch(error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const getCartItems = async () => {
        try {
            const Token = localStorage.getItem("userToken")
            const data = await axios.get(`${process.env.REACT_APP_API_KEY}/cart`, {headers: {Authorization:`Tariq__${Token}`}})
            setCartItemsCount(data.data.count)
            return data
        }catch(error) {
            // console.log(error)
        }
    }
    const removeItemCOntext = async (productId) => {
        try {
            const Token = localStorage.getItem("userToken")
            const {data} = await axios.patch(`${process.env.REACT_APP_API_KEY}/cart/removeItem`, {productId}, {headers: {Authorization:`Tariq__${Token}`}})
            toast.success("Item Removed Successfuly", {
                position: toast.POSITION.TOP_RIGHT
            });
            setCartItemsCount(data.count)
            return data
        }catch(error) {
            // console.log(error)
        }
    }
    const clearCart = async () => {
        try {   
            const Token = localStorage.getItem("userToken")
            const {data} = await axios.patch(`${process.env.REACT_APP_API_KEY}/cart/clear`, {}, {headers: {Authorization:`Tariq__${Token}`}})
            toast.success("Cart is Clear", {
                position: toast.POSITION.TOP_RIGHT
            });
            setCartItemsCount(data.count)
            return data
        }catch(error) {
            console.log(error)
        }
    }
    const increaseQuntity = async (productId) => {
        try {
            const Token = localStorage.getItem("userToken")
            const {data} = await axios.patch(`${process.env.REACT_APP_API_KEY}/cart/incraseQuantity`, {productId}, {headers: {Authorization:`Tariq__${Token}`}})
            return data
        }catch(error) {
            console.log(error)
        }
    } 
    const decreaseQuntity = async (productId) => {
        try {
            const Token = localStorage.getItem("userToken")
            const {data} = await axios.patch(`${process.env.REACT_APP_API_KEY}/cart/decraseQuantity`, {productId}, {headers: {Authorization:`Tariq__${Token}`}})
            return data
        }catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCartItems()
    })
    return (
        <cartContext.Provider value={{addToCartContext, getCartItems, removeItemCOntext, clearCart, decreaseQuntity, increaseQuntity, CartItemsCount}}>
            <>
            <ToastContainer autoClose={2000}></ToastContainer>
            {children}
            </>
        </cartContext.Provider>
    )
}

export default CartContextProvider