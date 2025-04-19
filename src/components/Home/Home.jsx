import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Home.module.css'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function Home() {

  const { addToCart, setnumOfCartItems } = useContext(cartContext)
  const [allProducts, setallProducts] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function getProducts() {
    setisLoading(true)
    let { data } = await axios(`https://ecommerce.routemisr.com/api/v1/products`)
    setallProducts(data.data)
    setisLoading(false)
  }

  async function addProduct(productId) {
    let response = await addToCart(productId)
    setnumOfCartItems(response?.data?.numOfCartItems)
    toast.success(response.data.message)
    if (localStorage.getItem('userToken') === '') {
      toast.error('Please Login ...');
    }
  }

  useEffect(() => {
    getProducts()

  }, [])

  return <>
    <div className={isLoading ? 'd-flex justify-content-center align-items-center vh-100 mt-0' : ''}>
      {isLoading ? <i className='fas fa-spinner fa-spin text-success fa-3x'></i> :

        <div className="container my-5 p-3">
          <div className="row justify-content-center my-5 g-3">
            {allProducts.map((product) =>
              <div className=" col-md-4 col-lg-3 col-xl-2" key={product._id}>
                <div className=' product bg- p-2 rounded-3 overflow-hidden'>
                  <div className='bg- p-2'>
                    <Link to={`/details/${product._id}`} className='text-decoration-none text-muted'>
                      <img src={product.imageCover} className='rounded-3 w-100' alt="" />
                      <p className='m-0 mt-3 text-success'>{product.subcategory[0].name}</p>
                      <h2 className='m-0 h5 '>{product.title.split(' ').splice(0, 2).join(' ')}</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className='m-0'>{product.price} <span>EGP</span></p>
                        <span className='d-flex align-items-center'>
                          <p className='m-0 pe-1'>{product.ratingsAverage} </p>
                          <i className="fa-solid text-warning fa-star"></i>
                        </span>
                      </div>

                    </Link>

                  </div>
                  <button onClick={() => addProduct(product._id)} className='btn w-100 btn-outline-success mt-3'>Add To Cart</button>
                </div>
              </div>
            )}
          </div>


        </div>
      }
    </div>

  </>
}

