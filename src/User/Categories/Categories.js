import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
import axios from 'axios'
import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Loading from '../Shared/Loading';

function Categories() {
    const {data, isLoading }  = useQuery({queryKey:['appCategories'], queryFn: async () => 
        await axios.get(`${process.env.REACT_APP_API_KEY}/categories`)
    })
    const items = data?.data.categories.map((item) => 
                        <SwiperSlide key={item._id}>   
                            <Link to={`/products/category/${item._id}`}>
                                <Image src={item.image.secure_url} rounded />
                            </Link>
                        </SwiperSlide>
                    )   
    if(isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className='d-flex justify-content-around align-items-center mt-4 py-3'>
            {data?.data.categories.length > 0 
            ? <Swiper 
                    modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                    spaceBetween={30} 
                    slidesPerView={3} 
                    navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    mousewheel={{ draggable: true }}
                    // onSlideChange={() => console.log('slide change')} 
                    // onSwiper={(swiper) => console.log(swiper)}
                >{items}</Swiper> 
            : <h1>There Is No Categories</h1>}
        </div>
    )
}

export default Categories