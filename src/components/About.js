import React, { useState } from 'react'

export default function About() {
   const host = "http://localhost:5000"

   const [name, setName] = useState("")
   const getUser = async () => {
      const response = await fetch(`${host}/auth/getuser`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
      });
      const json = await response.json();
      setName(json.name);
   }

   return (
      <div className='container text-center my-5'>
         <h1>About Page</h1>
      </div>
   )
}
