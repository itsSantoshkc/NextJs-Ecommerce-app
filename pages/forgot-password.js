import { useEffect } from "react"
import React from 'react'
import { useRouter } from 'next/router'

const forgotPassword = () => {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])
    return (
        <div>forgot-password</div>
    )
}

export default forgotPassword