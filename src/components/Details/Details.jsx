import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Details.module.css'
import { Link } from 'react-router-dom'
import img from '../../Assets/banner-4.jpeg'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function Details() {
  let params = useParams()
  const [productId, setproductId] = useState('')
  const [product, setProduct] = useState(null)
  const { addToCart } = useContext(cartContext)

  async function getProduct(id) {
    setproductId(id)
    let { data } = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setProduct(data.data)
  }

  useEffect(() => {
    getProduct(params.id)
  }, [])

  async function addProductToCart(setproductId) {
    let response = await addToCart(setproductId)
    toast.success(response.data.message)
  }


  return <>
    <div className="container my-3 p-3">
      <div className="row align-items-center py-4 my-5 g-3">

        <div className="col-md-3">
          <div><img src={product?.imageCover} className='w-100 rounded-3' alt="" /></div>
        </div>
        <div className="col-md-9">
          <div>
            <h3 className='h2'>{product?.title}</h3>
            <p className='text-muted m-0 my-1'>{product?.description}</p>
            <p className='text-success m-0 mt-4'>{product?.category.name}</p>
            <p className='m-0'>{product?.price}<span> EGP</span></p>
            <button onClick={() => addProductToCart(productId)} className='btn  btn-success w-100 mt-3'>+ Add To Cart</button>
          </div>
        </div>

      </div>

    </div>
  </>
}
