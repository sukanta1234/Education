import React, { useEffect } from 'react'
import Banner from '../Banner/Banner'
import Service from '../Service/Service'
import Testimonial from '../Testimonial/Testimonial'

import About1 from '../About1/About1'

import { useDispatch } from 'react-redux'
import { resetReirect } from '../../../Store/authSlice'

const Home = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(resetReirect(null))

  },[dispatch])
 
  return (
    <>
    <Banner/>
    <About1/>
    <Service/>
    <Testimonial/>
    
    </>
  )
}

export default Home
