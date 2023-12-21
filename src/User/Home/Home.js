import React from 'react'
import '../../style/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

function Home() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active bg-black" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2"  className='bg-black'/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" className='bg-black'/>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className='bg-image row'>
                        <div className='col-8 p-md-5 p-2 d-flex flex-column align-items-center justify-content-center'>
                            <h1 className='my-3 display-5'>Welcome To T-Shop</h1>
                            <p className='text-start'>Welcome To T-Shop</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className='bg-image'></div>
                </div>
                <div className="carousel-item">
                    <div className='bg-image'></div>                
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span><FontAwesomeIcon icon={faChevronLeft} className='fs-4 fw-bold text-black'></FontAwesomeIcon></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span><FontAwesomeIcon icon={faChevronRight} className='fs-4 fw-bold text-black'></FontAwesomeIcon></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default Home