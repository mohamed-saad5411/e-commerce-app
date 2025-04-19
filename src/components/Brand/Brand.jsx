import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Brand.module.css'
import { Link } from 'react-router-dom'



export default function Brand() {

  const [allProducts, setallProducts] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function getProducts() {
    setisLoading(true)
    let { data } = await axios(`https://ecommerce.routemisr.com/api/v1/brands`)
    setallProducts(data.data)
    setisLoading(false)
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

              <div className="col-lg-2 col-xsm col-sm-6 col-md-3 " key={product._id}>
                <div className='p-3 text-center pointer bg-body-secondary rounded-3 overflow-hidden'>
                  <img src={product.image} className='rounded-3 w-100' alt="" />
                  <h2 className='m-0 h5 mt-3'>{product.name}</h2>

                </div>
              </div>

            )}

          </div>


        </div>
      }
    </div>

  </>
}
