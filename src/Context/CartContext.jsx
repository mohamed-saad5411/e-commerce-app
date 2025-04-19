import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext()

export function CartContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken')
    }

    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartId, setcartId] = useState(null)

    useEffect(() => {
        getCart()
    }, [])

    async function getUserCart() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers
            }
        )
        
    }

    async function getCart() {
        let response = await getUserCart()
        if (response.data.status === 'success') {
            setcartId(response?.data?.data?._id)
            setnumOfCartItems(response?.data?.numOfCartItems)
        }    
    }

    async function addToCart(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId
            },
            {
                headers
            }
        )
    }

    async function payMent(cartId , shippingAdress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000/`,
            {
                shippingAdress: shippingAdress
            },
            {
                headers
            }
        )
    }

    async function updateProductCount(productId, count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            {
                headers
            }
        )
    }

    async function removeCartItem(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers
            }
        )
    }

    async function clearAllCart(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers
            }
        )
    }

    return <cartContext.Provider value={{cartId,numOfCartItems,setnumOfCartItems, payMent, clearAllCart, addToCart, getUserCart, removeCartItem, updateProductCount }}>
        {props.children}
    </cartContext.Provider>
}