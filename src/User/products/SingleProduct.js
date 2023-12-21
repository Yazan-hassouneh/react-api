import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Loading from '../Shared/Loading'
import { cartContext } from '../../Context/CartContext'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import Input from '../../Shared/Input'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function SingleProduct() {
    const navigate = useNavigate()
    const {productId} = useParams()
    const [details, setDetails] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const imgRef = useRef()
    const {addToCartContext} = useContext(cartContext)
    const add = async (_id) => {
        await addToCartContext(_id)
        navigate("/cart")
    }
    const getDetails = async () => {
        const data = await axios.get(`${process.env.REACT_APP_API_KEY}/products/${productId}`)
        if(data.status === 200) {
            setIsLoading(false)
            setDetails(data)
        }
    }
    useEffect(() => {
        getDetails()
    }, [])
    const ChangeImg = (e) => {
        imgRef.current.src = e.target.src
    }
    const commentValidation = yup.object({
        comment : yup.string().required("Comment is required"),
        rating : yup.number().required("Required").max(5).min(0)
    })
    const onSubmit = async info => {
        try {
            const Token = localStorage.getItem("userToken")
            const {data} = await axios.post(`${process.env.REACT_APP_API_KEY}/products/${productId}/review`, info, {headers:{Authorization:`Tariq__${Token}`}})
            if(data.message === "success") {
                toast.success("Comment Add successfuly", {
                    position: toast.POSITION.TOP_RIGHT
                });
                formik.resetForm();
                getDetails()
            }  
        }catch(error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const formik = useFormik({
        initialValues : {
            comment : "",
            rating : 0,
        },
        onSubmit,
        validationSchema : commentValidation
    })
    const data = [
        {
            id : 'comment',
            name : "comment",
            type: "text",
            title : "Comment",
            value : formik.values.comment
        },
        {
            id : 'rating',
            name : "rating",
            type: "number",
            title : "Rating",
            value : formik.values.rating
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
    if(isLoading) {
        return (
            <Loading></Loading>
        )
    }
    const {_id, mainImage, name, price, subImages, description, reviews} = details.data.product
    return (
        <div className='row justify-content-between mx-5 mt-5'>
            <ToastContainer></ToastContainer>
            <div className='col-12 col-md-6'>
                <div><img src={mainImage.secure_url} alt='main ' ref={imgRef} className='w-75'></img></div>
                <div className='bg-light-subtle border border-1 rounded-2 p-2 mt-3'>
                    <h5>Create Comment</h5>
                    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                        {RenderInputs}
                        <button type='submit' className='btn btn-outline-info' disabled={!formik.isValid}>comment</button>
                    </form>
                </div>
                <div className='mt-4 mx-3'>
                    <h5 className='mb-2 text-start'>comments : </h5>
                    {
                        reviews.length > 0
                        ? reviews.map((review)=>
                            <div key={review._id} className='my-2'>
                                <div className='bg-light-subtle border border-1 rounded-2 text-start p-2 '>
                                    <div>
                                        {
                                            Array.apply(null, Array((Math.ceil(review.rating)))).map((i, index)=>
                                                <FontAwesomeIcon key={index} icon={faStar} className='RatingStar' />
                                            )
                                        }
                                    </div>
                                    <div className='mt-1'>
                                        <div className='reviewImge d-inline-block'>
                                            <img src={review.createdBy.image.secure_url} alt='main pic' className='img-thumbnail rounded-circle w-100 h-100'></img>
                                        </div>
                                        <span className=' ms-1'> : {review.comment}</span>
                                    </div>
                                    <div className='text-start'><small >{review.createdAt.slice(0, 10)}</small></div>
                                </div>
                            </div>
                        )
                        : <h5>No Comments</h5>
                    }
                </div>
            </div>
            <div className='col-12 col-md-6 px-2 mt-5 mt-md-0'>
                <h2 className='text-start'>{name}</h2>
                <p className='mt-2 py-2 text-start'>{description}</p>
                <p className='text-start'>Price : <b>{price}$</b></p>
                <div className='d-flex justify-content-between w-100 flex-wrap'>
                    {
                        subImages.map((item, i) => 
                            <img key={i} src={item.secure_url} alt="More Details" className='subImg img-thumbnail' onClick={ChangeImg}/>
                        )
                    }
                </div>
                <button className='btn btn-outline-info my-2' onClick={() => add(_id)}>Add To Cart</button>
            </div>
        </div>
    )
}


export default SingleProduct