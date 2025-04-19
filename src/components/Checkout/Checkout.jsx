import React, { useContext, useState } from 'react'
// import style from './Checkout.module.css'
import { Formik, useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';


export default function Checkout() {
  let { payMent, cartId } = useContext(cartContext)
  const [isLoading, setisLoading] = useState(false)

  async function handleSubmit( values) {
    setisLoading(true)
    let response = await payMent(cartId,values)
    if (response.data.status === 'success') {
      window.location.href = response.data.session.url
      setisLoading(false)
    }
  }


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: handleSubmit
  })

  return <>
    <div className="container my-5">
      <form className='p-5' onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details</label>
        <input onChange={formik.handleChange} type="text" className='my-2 form-control' value={formik.values.details} name='details' id='details' />

        <label htmlFor="phone">Phone</label>
        <input onChange={formik.handleChange} type="tel" className='my-2 form-control' value={formik.values.phone} name='phone' id='phone' />

        <label htmlFor="city">City</label>
        <input onChange={formik.handleChange} type="text" className='my-2 form-control' value={formik.values.city} name='city' id='city' />

        {isLoading ?
            <button className='btn btn-success w-100 mt-5'><i className='fas fa-spinner fa-spin'></i></button>
            :
            <button type='submit' className='btn btn-success w-100 mt-5'>Go To Payment</button>
          }
      </form>
    </div>
  </>
}
