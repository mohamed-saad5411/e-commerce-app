import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Login.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import * as yup from 'yup'




export default function Login({ saveUserData }) {
  let navigat = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const { setuserData } = useContext(UserContext)


  async function handleLogin(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    if (data?.message === 'success') {
      localStorage.setItem("userToken", data?.token)
      setuserData(data?.token)
      setisLoading(false)
      navigat('/')
      console.log(values);

    }

  }

  let validationSchema = yup.object({
    email: yup.string().required('E-mail Is Required...').email(),
    password: yup.string(),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema
  })

  return <>
    <div className="container form-sm w-50 my-2 my-5 pt-4">
      <div className='my-5 bg-body-tertiary p-4 rounded-3'>
        <h2 className='mb-5'>Login ... </h2>

        <form onSubmit={formik.handleSubmit} className=''>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control my-4' value={formik.values.email} name='email' id='email' placeholder='Enter your E-Mail .....' />
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control my-4' value={formik.values.password} name='password' id='password' placeholder='Enter your Password .....' />
          {isLoading ?
            <button className='btn btn-success'><i className='fas fa-spinner fa-spin'></i></button>
            :
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success'>Login</button>
          }
        </form>

      </div>

    </div>
  </>
}
