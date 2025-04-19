import './App.css'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Brands from './components/Brand/Brand'
import Cart from './components/Cart/Cart'
import Product from './components/Product/Product'
import Checkout from './components/Checkout/Checkout'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import Details from './components/Details/Details'
import toast, { Toaster } from 'react-hot-toast';
import UserContextProvider from './Context/userContext'
import { CartContextProvider } from './Context/CartContext'

function App() {


  let router = createBrowserRouter([
    {
      path: '', element: <Layout></Layout>, children: [
        { path: '/', element: <Home></Home> },
        { path: '/e-commerce-app', element: <Home></Home> },
        { path: '/category', element: <Categories></Categories> },
        { path: '/brands', element: <Brands></Brands> },
        { path: '/cart', element: <Cart></Cart> },
        { path: '/details/:id', element: <Details></Details> },
        { path: '/products', element: <Product></Product> },
        { path: '/login', element: <Login></Login> },
        { path: '/register', element: <Register></Register> },
        { path: '/checkout', element: <Checkout></Checkout> },
        { path: '*', element: <NotFound></NotFound> },
      ]
    }
  ])

  return <>
    <UserContextProvider >
      <CartContextProvider>
        <Toaster></Toaster>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </UserContextProvider>

  </>


}

export default App
