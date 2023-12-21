import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../Shared/Loading'

function AllProducts() {
    const [AllProducts, setAllProducts] = useState([])
    const [NumberOfPages, setNumberOfPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [customeResult, setCustomeResult] = useState({
        gte : 0,
        lte : 1000,
        sortBy : "",
        search: "",
        dec : ""
    })
    const getAll = async (i, gte = 0, lte = 1000, sortBy="", search= "", dec="") => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_KEY}/products?page=${i}&search=${search}&price[gte]=${gte}&price[lte]=${lte}&sort=${dec}${sortBy}`)
        if(data.message === "success") {
            setIsLoading(false)
            setAllProducts(data.products)
            if(data.page > 0) {
                const x = data.total /data.page
                setNumberOfPages(x)
            }else {
                setNumberOfPages(0)
            }
        }
    }
    useEffect(() => {
        getAll(1)
    }, [])
    const setValues =  (e) => { 
        setCustomeResult(customeResult => ({...customeResult, [e.target.name] :e.target.value }))
        getAll(1, ...Object.values(customeResult))
    }
    const changeValues = (e) => {
        setCustomeResult(customeResult => ({...customeResult, [e.target.name] :e.target.value }))
    }
    if(isLoading) {
        return(<Loading></Loading>)
    }
    return (
        <Container className='mt-5 py-3'>
            <div className='my-2 py-3'>
                <form>
                    <div className='d-flex flex-wrap justify-content-around'>
                        <div className='mx-3 my-2 d-flex align-items-center'>
                            <label className='me-2'>Search</label>
                            <input type='text' placeholder='Text' name='search' className='border-2 border-dark rounded-2' onKeyUp={setValues}></input>
                        </div>
                        <div className='mx-3 my-2 d-flex align-items-center'>
                            <label className='me-2'>Sort By</label>
                            <select name='sortBy' className='border-2 border-dark rounded-2' onChange={setValues} onMouseUp={setValues}>
                                <option value="">  ----  </option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                            </select>
                        </div>
                        <div className='mx-3 my-2 d-flex align-items-center'>
                            <label className='me-2'>Order</label>
                            <select name='dec' className='border-2 border-dark rounded-2' onChange={setValues} onMouseUp={setValues}>
                                <option value="">  ----  </option>
                                <option value="-">descending order</option>
                                <option value="">Ascending order</option>
                            </select>
                        </div>
                        <div className='mx-3 my-2 d-flex  align-items-center'>
                            <label className='me-2'>Less Than</label>
                            <input type='range' min={0} max={1000} value={customeResult.lte} name='lte' className='border-2 border-dark rounded-2' onMouseUp={setValues} onChange={changeValues}></input>
                            <span className='ms-2'>{customeResult.lte}</span>
                        </div>
                        <div className='mx-3 my-2 d-flex  align-items-center'>
                            <label className='me-2'>Gerater Than</label>
                            <input type='range' min={0} max={1000} value={customeResult.gte} name='gte' className='border-2 border-dark rounded-2' onMouseUp={setValues} onChange={changeValues}></input>
                            <span className='ms-2'>{customeResult.gte}</span>
                        </div>
                    </div>
                </form>
            </div>
            <Row className='justify-content-center'>
                {
                    AllProducts.length > 0
                    ? AllProducts.map((product) => 
                        <Col md={6} lg={4} key={product._id} className='my-3'>
                            <Card style={{ width: '18rem' }}  className='mx-auto mt-3 border-0'>
                            <Card.Img variant="top" src={product.mainImage.secure_url} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                {
                                    product.price === product.finalPrice
                                    ? <></>
                                    : <Card.Subtitle className='text-decoration-line-through fw-bold text-danger d-inline'>{product.price}$</Card.Subtitle>
                                }
                                <Card.Subtitle className='d-inline'> {product.finalPrice}$</Card.Subtitle>
                                <Button variant="primary" className='my-3 d-block m-auto'><Link to={`/products/${product._id}`} className='text-white text-decoration-none'>Show Details</Link></Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    )
                    : <h2>Not Found</h2>
                }
            </Row>
            <div className='py-2'>
                {
                    NumberOfPages > 0
                    ? Array.apply(null, Array(Math.ceil(NumberOfPages))).map((i, index)=>
                        <Button key={index} variant="outline-primary" className='mx-3' onClick={() => getAll(index+1)}>{index+1}</Button>
                        )
                    : <></>
                }   
            </div>  
        </Container>
    )
}

export default AllProducts