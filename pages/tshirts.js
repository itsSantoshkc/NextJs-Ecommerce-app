import Link from 'next/link'
import React from 'react'
import Product from '../models/Product'
import connectDb from "../middleware/mongoose"
import mongoose from 'mongoose'



const tshirts = ({ products }) => {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 " >
          {Object.keys(products).map((product) => {
            return <Link passHref={true} key={products[product]._id} href={`/product/${products[product].slug}`}>
              <div className="lg:w-1/4 md:w-1/2 hover:shadow-xl p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-scale-down object-center w-full h-full block" src={products[product].img} />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[product].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[product].title}</h2>
                  <p className="mt-1">${products[product].price}</p>
                  {products[product].size.includes('S') && <span className="mt-1 mx-1">S</span>}
                  {products[product].size.includes('M') && <span className="mt-1 mx-1">M</span>}
                  {products[product].size.includes('L') && <span className="mt-1 mx-1">L</span>}
                  {products[product].size.includes('X') && <span className="mt-1 mx-1">X</span>}
                  {products[product].size.includes('XL') && <span className="mt-1 mx-1">XL</span>}
                </div>
                <div className="mt-1">
                  {products[product].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[product].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[product].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[product].color.includes('White') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[product].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                </div>
              </div>
            </Link>

          })}
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "Tshirt" })
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }
  }
}

export default tshirts