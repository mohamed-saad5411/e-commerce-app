import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Layout.module.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/userContext'



export default function Layout({ setUserData }) {
  const { setuserData } = useContext(UserContext)


  return <>
    <Navbar />
    <Outlet></Outlet>
    <Footer />

  </>
}
