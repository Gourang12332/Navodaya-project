'use client'
import React, { useState } from 'react'

export default function page() {
    const [history,setHistory] = useState([])

    const HandleSubmit = async () =>{
        const response = await fetch('/api/history' , {
            method: "Post",
        })
        const result = await response.json();
        console.log(result.users[0]);  // array of objects
        setHistory(result.users)
    }
  return (
    <>
    <ol>{
        history.map((e)=>{  
            console.log(e);
            return <div className="card" key={e}>   
            {Object.keys(e).map(item =>(
           <div className="shippings">{item}: {e[item]}</div>
          ))
        }
         </div>
        })
        }</ol>
    <button className='bg-red-500' onClick={HandleSubmit}>FetchHistory</button>
    </>
  )
}
