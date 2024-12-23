import React from 'react'
import './Header.css';
import { object } from 'zod';

export default function Header() {
  return (
    <div id='main'>
      <div className="left1" ></div>
      <div className="right1">
        <div className="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyWXW7P-CM_Z8bFLvl5hnCyQBgDu417GnfPg&s" alt=""  />
        </div>
         <div className="welcome">
            <p>Welcome</p>
            <p>Rahul</p>
         </div>
      </div>
    </div>
  )
}
