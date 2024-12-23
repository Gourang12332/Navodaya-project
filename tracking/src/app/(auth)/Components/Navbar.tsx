'use client'

import React from 'react'
import { useSession } from 'next-auth/react';

export default function Navbar() {
     const { data: session } = useSession();
     if(session){
        return (
            <div>
              <ol>
                <li>history</li>
                <li>about</li>
                <li>feedback</li>
              </ol>
            </div>
          )
     } 
     return (
        <div>
          <ol>
             <li>about</li>
            <li>feedback</li>
          </ol>
        </div>
      )
}
