import React, { useContext, useEffect, useState } from 'react'
import "./cart.css"
import { cartContext } from '../../Context/CartContext'
import Loading from '../Shared/Loading'
import Links from '../../Shared/Links'
function Cart() {
    
    const {getCartItems, removeItemCOntext, clearCart, increaseQuntity, decreaseQuntity} = useContext(cartContext)
    const [products, setProducts] = useState()
    const [count, setCount] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    
    const getData = async () => {
        try {
            const {data} = await getCartItems()
            if(data.message === "success") {
                setIsLoading(false)
                setCount(data.count)
                setProducts(data.products)
                setTotalPrice(0)
                await data.products.map((item) => 
                setTotalPrice((prev) => prev += (item?.details.finalPrice * item?.quantity))
            )
            }
        }catch(error) {
            // console.log(error)
        }
    }
    useEffect(() => {
        getData()
    },[getCartItems, count])
    const removeItem = async(id) => {
        const respos = await removeItemCOntext(id)
        await getData()
        return respos
    }
    const increase = async(id) => {
        const respos = await increaseQuntity(id)
        await getData()
        return respos
    }
    const decreases = async(id) => {
        const respos = await decreaseQuntity(id)
        await getData()
        return respos
    }
    const clearcart = async() => {
        const respons = await clearCart()
        await getData()
        return respons
    }
    if(isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className="cart">
            <div className="container">
                <div className="">
                    <div className='my-3 py-2'>
                        <h1>Cart Summery</h1>
                        <div className='row justify-content-between border border-1 border-dark rounded-2'>
                            <div className='col-12 col-sm-5 my-2'>
                                {
                                    count > 0
                                    ?  <p className='fs-5 fw-bold'>Tota Price : {totalPrice.toFixed(2)}</p>
                                    : <p>There Is No Items</p>
                                }
                            </div>
                            <div className='col-12 col-sm-3 my-2'>
                                <Links title={"Chekout"} path={"/order"} Style={`btn text-bg-dark py-2 rounded-2 ${count === 0 ? 'disabled' : ''} `}></Links>
                            </div>
                        </div>
                    </div>
                    <div className="cart-items">
                        <div className="products  mb-4 p-2 mb-md-0" id="products">
                            <div className="item">
                                <div className="product-info">
                                    <h2>Product</h2>
                                </div>
                                <div className="quantity">
                                    <h2>Quantity</h2>
                                </div>
                                <div className="price">
                                    <h2>Price</h2>
                                </div>
                                <div className="subtotal">
                                    <h2>Discount</h2>
                                </div>
                                <div className="subtotal">
                                    <h2>Subtotal</h2>
                                </div>
                            </div>
                            {
                                count > 0
                                ?  (
                                    products.map((product) => 
                                        <div className="item" key={product._id}>
                                            <div className="product-info">
                                                <img src={product.details.mainImage.secure_url} alt='product'/>
                                                <div className="product-details">
                                                    <h2>{product.details.name}</h2>
                                                    <span>Color:black</span>
                                                    <button className='btn btn-danger text-bg-danger' onClick={() =>removeItem(product.details._id)}>remove</button>
                                                </div>
                                            </div>
                                            <div className="quantity">
                                                <button onClick={() => decreases(product.details._id)} className={`btn text-success fw-bolder fs-4 ${product.quantity === 1 ? 'disabled' : ''}`}>-</button>
                                                <span>{product.quantity}</span>
                                                <button onClick={() => increase(product.details._id)} className="fw-bolder text-success fs-4">+</button>
                                            </div>
                                            <div className="price ">${product.details.price}</div>
                                            <div className="price">${product.details.discount}</div>
                                            <div className="subtotal">${product.details.finalPrice}</div>
                                        </div>
                                    )
                                )
                                : <h2>Cart IS Empty</h2>
                            }
                        </div>
                    </div>
                    <div className="mt-2">
                        <button className={`btn btn-danger p-2 fw-bold fs-5 ${count > 0 ? '' : 'disabled'}`} onClick={clearcart}  >Clear Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart