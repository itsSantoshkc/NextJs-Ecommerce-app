import React from 'react'
import Link from 'next/link'
import { BsBagCheck } from 'react-icons/bs'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const checkout = ({ cart, addToCart, subTotal, removeFromCart, clearCart }) => {
    return (
        <div className="container m-auto">
            <div>
                <h1 className="font-bold text-xl my-8 text-center">Checkout</h1>
                <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
                <div className="flex mx-auto">
                    <div className="px-2 w-1/2">
                        <div className="realtive mb-4">
                            <label htmlFor="name" className='leading-7 text-sm text-gray-600'>Name</label>
                            <input type="text" id='name' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="realtive mb-4">
                            <label htmlFor="email" className='leading-7 text-sm text-gray-600'>Email</label>
                            <input type="email" id='email' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                        </div>
                    </div>
                </div>
                <div className="px-2 w-full ">
                    <div className="realtive mb-4">
                        <label htmlFor="address" className='leading-7 text-sm text-gray-600'>Address</label>
                        <input type="text" id='address' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                    </div>
                </div>
                <div className="flex mx-auto">
                    <div className="px-2 w-1/2">
                        <div className="realtive mb-4">
                            <label htmlFor="phone" className='leading-7 text-sm text-gray-600'>Phone</label>
                            <input type="phone" id='phone' name='phone' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="realtive mb-4">
                            <label htmlFor="city" className='leading-7 text-sm text-gray-600'>Email</label>
                            <input type="text" id='city' name='city' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                        </div>
                    </div>
                </div>
                <div className="flex mx-auto">
                    <div className="px-2 w-1/2">
                        <div className="realtive mb-4">
                            <label htmlFor="state" className='leading-7 text-sm text-gray-600'>State</label>
                            <input type="text" id='state' name='state' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="realtive mb-4">
                            <label htmlFor="pincode" className='leading-7 text-sm text-gray-600'>Pincode</label>
                            <input type="text" id='pincode' name='pincode' className='w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-4 '>
                <h2 className='font-semibold text-xl'>2. Review Cart Items & pay</h2>
                <div className="z-10 sideCart m-2  bg-gray-300 py-10 px-8 transform transition-transform">

                    <ol className=' text-black list-decimal font-semibold'>
                        {Object.keys(cart).length == 0 &&
                            <div className='my-4 font-normal'>No Items In The Cart</div>}
                        {Object.keys(cart).map((k) => {


                            return (< li key={k} >
                                <div className="item flex my-5">
                                    <div className='text-black  font-semibold'>{`${cart[k].name} -(${cart[k].size}) ${cart[k].variant}`}
                                    </div>
                                    <div className='text-black w-1/3 flex items-center justify-center font-semibold text-lg'>
                                        <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer' />
                                        <span className='mx-2'>{cart[k].qty}</span>
                                        <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer' /></div>
                                </div>
                            </li>
                            )
                        })}
                        <hr />
                    </ol>
                    <span className="font-semibold ">${subTotal}</span>
                </div>
                <div className="mx-4">
                    <button className="inline-flex text-gray-200 mr-2 items-center justify-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                        <BsBagCheck /><h1 className='mx-2 flex'>Pay</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default checkout