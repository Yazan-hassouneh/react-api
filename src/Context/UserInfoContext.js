import React, { createContext } from 'react'
import {jwtDecode} from  'jwt-decode'
import { useState, useEffect } from 'react'

export const UserInfoContext = createContext()

function UserInfoContextProvider({children}) {
    const [user, setUser] = useState()
    const saveUserData = () => {
        const token = localStorage.getItem("userToken")
        const decode = jwtDecode(token)
        setUser(decode)
    }
    useEffect(() => {
        if(localStorage.getItem("userToken")) {
        saveUserData()
        }
    }, [])
    return (
        <UserInfoContext.Provider value={{user, setUser, saveUserData}}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoContextProvider