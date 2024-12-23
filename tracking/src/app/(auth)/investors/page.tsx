import React from 'react'
import Header from '../Components/Header'
import { Footers } from '../Components/Footer'
import Navbar from '../Components/Navbar'
import './investors.css'

export default function page() {
  return (
    <>
    <Header></Header>
    <Navbar></Navbar>
    <div id='Hero'>
      <div className="title">Investors</div>
      <div className="inv_img">
        <div className="left">
          <div className="leftpcs"></div>
          <div className="leftpcs"></div>
          <div className="leftpcs"></div>
          <div className="leftpcs"></div>
        </div>
        <div className="right">
          <div className="right_div">

          </div>
        </div>
      </div>
      </div>
      <Footers></Footers>
    </>
  )
}
