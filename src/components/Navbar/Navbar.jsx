import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/freshcart-logo.svg';
import { UserContext } from '../../Context/userContext'
import { cartContext } from '../../Context/CartContext';


export default function Navbar({ logOut }) {
  const { userData, setuserData } = useContext(UserContext)
  const { numOfCartItems } = useContext(cartContext)
  let navigate = useNavigate()

  function logOut() {
    setuserData(null)
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  return <>
   
    <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
      <div className="container ">
        <Link to='/' className="navbar-brand"><img src={logo} alt="" /></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">

          {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">

            <li className="nav-item">
              <Link className="nav-link active" to="/" aria-current="page"
              >Home
                <span className="visually-hidden">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex" to="cart">Cart
                <div className='cart-icon-container position-relative'>
                  <i className="fa-solid fa-lg text-success cart-icon fa-cart-shopping"></i>
                  <div className='cart-count-container d-flex align-items-center justify-content-center rounded-2 position-absolute'>
                    <p className=' m-0 cart-count'>{numOfCartItems}</p>

                  </div>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="category">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>

          </ul> : ''
          }
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userData == null ? <>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link" aria-current="page"
                >Register
                </Link >
              </li>
              <li className="nav-item">
                <Link to={'/login'} className="nav-link" aria-current="page"
                >Login
                </Link >
              </li>
            </> : <li className="nav-item ">

              <span onClick={logOut} className="nav-link pointer" aria-current="page"
              >Logout
              </span >
            </li>}




          </ul>

        </div>
      </div>
    </nav>

  </>
}
