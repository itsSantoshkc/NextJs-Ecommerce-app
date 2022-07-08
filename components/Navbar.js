import React, { useRef } from 'react'
import Link from 'next/link'
import { GrHomeOption } from "react-icons/gr";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsBagCheck } from 'react-icons/bs'

const Navbar = ({ logOut, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }

  }
  const ref = useRef()
  return (
    <header className="text-gray-400 bg-gray-900 body-font ">

      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/'}>
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <GrHomeOption className="w-10 h-10 bg-white" />
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Link href={'/tshirts'}>
            <a className="mr-5 hover:text-white">Tshirt</a>
          </Link>
          <Link href={'/hoodies'}>
            <a className="mr-5 hover:text-white">Hoodies</a>
          </Link>
          <Link href={'/mugs'}>
            <a className="mr-5 hover:text-white">Mugs</a>
          </Link>
          <Link href={'/stickers'}>
            <a className="mr-5 hover:text-white">Stickers</a>
          </Link>
        </nav>
        {user.value &&
          <div>
            <Link href={'/myaccount'}>
              <button className="inline-flex items-center  bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 mr-2 md:mt-0">
                My Account
              </button></Link>
            <Link href={'/orders'}>
              <button className="inline-flex items-center  bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 mr-2 md:mt-0">
                Orders
              </button></Link>
            <button onClick={toggleCart} className="inline-flex items-center   bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mr-2 md:mt-0">
              <HiOutlineShoppingCart />Cart
            </button>
            <button onClick={logOut} className="inline-flex items-center  bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 mr-2 md:mt-0">
              <h1>Log Out</h1>
            </button>
          </div>}
        {!user.value && <div>
          <Link href={'/login'}>
            <button className="inline-flex items-center  bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              <h1>Login</h1>
            </button>
          </Link>
          <Link href={'/signup'}>
            <button className="inline-flex items-center mx-4 bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              <h1> Sign Up</h1>
            </button>
          </Link>
        </div>}


      </div>
      <div ref={ref} className={`z-10 sideCart overflow-y-auto  w-72  h-[100vh]  fixed   top-0 right-0 bg-gray-300 py-10 px-8 transform transition-transform 
      ${Object.keys(cart).length !== 0 ? 'translate-x-0' : "translate-x-full"}`}>
        <h2 className="font-bold text-xl text-black">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-2 right-2 text-black cursor-pointer"><AiFillCloseCircle /></span>
        <ol className=' text-black list-decimal font-semibold'>
          {Object.keys(cart).length == 0 &&
            <div className='my-4 font-normal'>No Items In The Cart</div>}
          {Object.keys(cart).map((k) => {


            return (< li key={k} >
              <div className="item flex my-5">
                <div className='text-black w-2/3 font-semibold'>{`${cart[k].name} -(${cart[k].size}) ${cart[k].variant}`}
                </div>
                <div className='text-black w-1/3 flex items-center justify-center font-semibold text-lg'>
                  <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer' />
                  <span className='mx-2'>{cart[k].qty}</span>
                  <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer' /></div>
              </div>
            </li>
            )
          })}
        </ol>
        <h2 className="font-semibold text-xl text-black mb-2">Total : ${subTotal}</h2>
        <div className="flex">
          <Link href={'/checkout'}>
            <button className="inline-flex mr-2 items-center justify-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              <BsBagCheck /><h1 className='mx-2 flex'>Check Out</h1>
            </button>
          </Link>
          <button onClick={clearCart} className="inline-flex mr-2 items-center justify-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            <h1 className='mx-2 flex'>Clear Cart</h1>
          </button>
        </div>
      </div>
    </header >
  )
}

export default Navbar