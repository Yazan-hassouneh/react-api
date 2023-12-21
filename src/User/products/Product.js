import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NoProducts from './NoProducts'
import Loading from '../Shared/Loading'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

function Product() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {categoryId} = useParams()
    const getData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_KEY}/products/category/${categoryId}`)
        if(data.message === "success") {
            setData(data.products)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    },[])
    if(isLoading) {
        return (
            <Loading></Loading>
        )
    }
    if(data.length === 0) {
        return (
            <NoProducts></NoProducts>
        )
    }
    const products = data.map((item) => 
        <Card style={{ width: '18rem' }} key={item._id} className='col-12 col-sm-6 col-md-3 mt-3 border-0'>
        <Card.Img variant="top" src={item.mainImage.secure_url} />
        <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle>Price : {item.price}$</Card.Subtitle>
            <Button variant="primary" className='my-3'><Link to={`/products/${item._id}`} className='text-white text-decoration-none'>Show Details</Link></Button>
        </Card.Body>
        </Card>
    )
    return (
        <div className='row justify-content-between mx-5 mt-5'>
            {products}
        </div>
    )
}

export default Product