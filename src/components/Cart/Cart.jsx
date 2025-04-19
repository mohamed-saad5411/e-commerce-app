import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Cart.module.css'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'


export default function Cart() {
  const { getUserCart, clearAllCart, removeCartItem, updateProductCount, cartId, setnumOfCartItems } = useContext(cartContext)
  const [cartProducts, setcartProducts] = useState([])
  const [cartProductDetails, setcartProductDetails] = useState('')
  const [isLoading, setisLoading] = useState(false)

  async function displayCart() {
    setisLoading(true)
    let response = await getUserCart()
    setcartProducts(response?.data?.data?.products)
    setcartProductDetails(response.data.data)
    setisLoading(false)

  }

  async function updateCount(productId, count) {
    let response = await updateProductCount(productId, count)
    setcartProducts(response?.data?.data?.products)
    setcartProductDetails(response.data.data)

  }

  async function deleteCartItem(productId) {
    let response = await removeCartItem(productId)
    setcartProducts(response?.data?.data?.products)
    setcartProductDetails(response.data.data)
    setnumOfCartItems(response?.data?.numOfCartItems)
  }

  async function clearCart() {
    let response = await clearAllCart()
    setcartProducts(response?.data?.data?.products)
    setnumOfCartItems(0)
    cartProductDetails.totalCartPrice = 0
  }

  useEffect(() => {
    displayCart()
  }, [])

  return <>

    <div className={isLoading ? 'd-flex justify-content-center align-items-center vh-100 mt-0' : ''}>
      {isLoading ? <i className='fas fa-spinner fa-spin text-success fa-3x'></i> :

        <div className="container  py-5 my-5">
          <h3>My Cart :</h3>
          {cartProducts?.map((product) =>

            <div id='cart' key={product.product._id} className='bg-body-secondary my-3 rounded-3 p-3 d-flex align-items-center'>
              <img className='p-3 cart-img' src={product.product.imageCover} alt="" />
              <div className='ms-lg-3 w-100'>
                <h2 className='h4 bg-'>Product Name : {product.product.title}</h2>
                <p className='text-success m-0 my-2'>Product Price : {product.price} EGP</p>
                <div className='d-flex cart-price align-items-center justify-content-between '>
                  <p className='text-success m-0 my-2'>Total Product Price : {product.price * product.count} EGP</p>
                  <div className='bg- w-25 m-auto cart d-flex align-items-center justify-content-around my-3'>
                    <button onClick={() => updateCount(product.product._id, product.count + 1)} className='btn btn-outline-success btn-sm'><i className="fa-solid fa-plus"></i></button>
                    <p className='m-0'>{product.count}</p>
                    <button onClick={() => updateCount(product.product._id, product.count - 1)} className='btn btn-outline-success btn-sm'><i className="fa-solid fa-minus"></i></button>
                  </div>
                </div>
                <button onClick={() => deleteCartItem(product.product._id)} className='text-danger btn btn-outline-danger'><i className="fa-solid fa-trash pe-2"></i>Remove From Cart</button>
              </div>

            </div>

          )}
          <p className='text-success h4 m-0 mt-4'>Total Price : {cartProductDetails?.totalCartPrice} <span>EGP</span></p>
          {!cartProductDetails?.totalCartPrice == 0 ? <div className="row">
            <div className="col">
              <button onClick={() => clearCart()} className='btn btn-outline-danger w-100 mt-4'>Clear All Products In Cart</button>
            </div>
            <div className="col">
              <Link className='text-decoration-none' to={'/checkout'}><button className='btn btn-outline-success w-100 mt-4'>Checkout Payment</button></Link>
            </div>
          </div> : ''


          }
        </div>
      }
    </div>

  </>
}
