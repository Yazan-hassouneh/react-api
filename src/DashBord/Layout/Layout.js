import React from 'react'
import NavBar from '../Shared/NavBar'
import Footer from '../Shared/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default Layout