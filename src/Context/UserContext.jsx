import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'


export let UserContext = createContext()

export default function UserContextProvider(props) {

  const [userData, setuserData] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setuserData(localStorage.getItem('userToken'))
    }
  }, [])

  // console.log(userData);

  return <UserContext.Provider value={{ setuserData, userData }}>
    {props.children}
  </UserContext.Provider>
}

