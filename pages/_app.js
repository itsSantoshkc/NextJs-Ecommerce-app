import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'


function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState("")
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        setSubTotal(JSON.parse(localStorage.getItem("total")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    } const token = localStorage.getItem("token")
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }
  }, [router.query])



  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subT = 0;
    let keys = Object.keys(cart)
    for (let i = 0; i < keys.length; i++) {
      { !myCart[keys[i]] ? subT = 0 : subT += myCart[keys[i]]["price"] * myCart[keys[i]].qty }
    }
    setSubTotal(subT)
    localStorage.setItem("total", JSON.stringify(subT))
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setcart(newCart)
    saveCart(newCart)
  }
  const clearCart = () => {
    saveCart({})
    setcart({})
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    } if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setcart(newCart)
    saveCart(newCart)
  }



  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } }
    setcart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  const logOut = () => {
    toast.success('You are Logged Out Sucessfully', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    localStorage.removeItem('token')
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
  }

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={3000}
        onLoaderFinished={() => setProgress(0)}
      />
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
      <Head>
        <link rel="icon" href="/logo.svg" type="image/svg" />
      </Head>
      {key && <Navbar logOut={logOut} key={key} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
        clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} />}
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
        clearCart={clearCart} subTotal={subTotal} {...pageProps} buyNow={buyNow} />
      <Footer />


    </>
  )
}

export default MyApp
