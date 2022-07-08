import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const signup = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let response = await res.json()
        console.log(response)
        // router.push('/')
        setname('')
        setemail("")
        setpassword("")
        toast.success('User Created Sucessfully', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });


    }
    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setname(e.target.value)
        }
        else if (e.target.name == 'email') {
            setemail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setpassword(e.target.value)
        }

    }


    return (
        <div className="h-screen dark:bg-gray-900 flex justify-center items-center">
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


            <div className="lg:w-2/5 md:w-1/2 w-2/3">
                <form onSubmit={handleSubmit} method="POST" className="bg-white p-10 rounded-xl shadow-lg min-w-full ">
                    <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Sign Up</h1>
                    <div className='shadow-lg '>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="name">Username</label>
                        <input onChange={handleChange} className="w-full focus:border-indigo-600 border-2 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none " type="text" name="name" id="name" placeholder="name" />
                    </div>
                    <div className='shadow-lg'>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
                        <input onChange={handleChange} className="w-full focus:border-indigo-600 border-2 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="xyz@email.com" />
                    </div>
                    <div className='shadow-lg'>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
                        <input onChange={handleChange} className="w-full focus:border-indigo-600 border-2 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <div className='shadow-lg'>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="confirm">Confirm password</label>
                        <input className="w-full focus:border-indigo-600 border-2 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="password" name="confirm" id="confirm" placeholder="Confirm Password" />
                    </div>
                    <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Sign Up</button>
                    <Link href={'/login'}>
                        <button type="submit" className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">Login</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default signup