import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Categories.module.css'
import { Link } from 'react-router-dom'



export default function Categories() {
  const [allProducts, setallProducts] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function getProducts() {
    setisLoading(true)
    let { data } = await axios(`https://ecommerce.routemisr.com/api/v1/categories`)
    setallProducts(data.data)
    setisLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])


  return <>
  <div className={isLoading ? 'd-flex justify-content-center align-items-center vh-100 mt-0' :''}>
    {isLoading ? <i className='fas fa-spinner fa-spin text-success fa-3x'></i>
      :
      <div className="container my-5 p-3">
        <div className="row my-5 g-3">
          {allProducts.map((product) =>

            <div className="col-lg-2 col-sm-6 col-md-3 col-xsm m-auto my-3" key={product._id}>
              <div className='p-3 product main-product rounded-3 overflow-hidden'>
                <img src={product?.image} className='rounded-3 w-100' alt="" />
                <p className='m-0 mt-3  text-success'>{product?.name}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <span className='d-flex align-items-center'>
                  </span>
                </div>
                <button className='btn w-100 btn-outline-success mt-3'>Add To Cart</button>

              </div>

            </div>


          )}

        </div>


      </div>

    }
  </div>
  </>
}
