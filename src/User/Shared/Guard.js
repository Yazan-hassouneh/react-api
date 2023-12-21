import React from 'react'
import Login from '../Login/LogIn'

function Guard({children}) {
    if(localStorage.getItem("userToken") === null) {
        return (
            <Login></Login>
        )
    }
    return(
        children
    )

}

export default Guard