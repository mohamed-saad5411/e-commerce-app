import axios from 'axios'
import { useFormik, validateYupSchema } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
// import style from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import * as yup from 'yup'



export default function Register({ setUserData, saveUserData }) {
  let navigat = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const { setuserData } = useContext(UserContext)

  async function handleRegister(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    if (data?.message === 'success') {
      setisLoading(false)
      navigat('/login')
    }

  }

  let validationSchema = yup.object({
    name: yup.string().required('Name Is Required...').min(3, 'Min Len. 3').max(25),
    email: yup.string().required('E-mail Is Required...').email(),
    password: yup.string(),
    rePassword: yup.string(),
    phone: yup.string(),
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    onSubmit: handleRegister,
    validationSchema

  })
  // console.log(formik);

  return <>
    <div className="container form-sm w-50 my-2 pt-4">
      <div className='my-5 bg-body-tertiary p-4 rounded-3'>
        <h2 className='mb-5'>Register ... </h2>

        <form onSubmit={formik.handleSubmit} className=''>
          <div className='my-0'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' value={formik.values.name} name='name' id='name' placeholder='Enter your Name .....' />
            <p className={` ${!(formik.errors.name && formik.touched.name) ? 'd-none' : 'd-block', 'm-0', 'text-danger'} `}>{formik.errors.name} </p>
          </div>
          <div className='my-0'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' value={formik.values.email} name='email' id='email' placeholder='Enter your E-Mail .....' />
            <p className={` ${!(formik.errors.email && formik.touched.email) ? 'd-none' : 'd-block', 'm-0', 'text-danger'} `}>{formik.errors.email} </p>
          </div>
          <div className='my-0'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' value={formik.values.password} name='password' id='password' placeholder='Enter your Password .....' />
            <p className={` ${!(formik.errors.password && formik.touched.password) ? 'd-none' : 'd-block', 'm-0', 'text-danger'} `}>{formik.errors.password} </p>
          </div>
          <div className='my-0'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' value={formik.values.rePassword} name='rePassword' id='rePassword' placeholder='Enter Repassword .....' />
            <p className={` ${!(formik.errors.rePassword && formik.touched.rePassword) ? 'd-none' : 'd-block', 'm-0', 'text-danger'} `}>{formik.errors.rePassword} </p>
          </div>
          <div className='my-0'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' value={formik.values.phone} name='phone' id='phone' placeholder='Enter your Phone .....' />
            <p className={` ${!(formik.errors.phone && formik.touched.phone) ? 'd-none' : 'd-block', 'm-0', 'text-danger'} `}>{formik.errors.phone} </p>
          </div>


          {isLoading ?
            <button className='btn btn-success'><i className='fas fa-spinner fa-spin'></i></button>
            :
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success'>Register</button>
          }
        </form>

      </div>

    </div>
  </>
}
