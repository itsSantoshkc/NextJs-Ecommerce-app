 import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
    <Head>
      <title>Ecommerce</title>
      <link rel="icon" href="/logo.svg"  type="image/svg"/> 
    </Head>
  
  <img src="./home.jpg" alt="" />

     
    </>
  )
}
