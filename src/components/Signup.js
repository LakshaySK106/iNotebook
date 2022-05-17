import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

   const host = "http://localhost:5000";
   let navigate = useNavigate();

   const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:"" })

   const submitFunc = async (element) => {
      element.preventDefault();
      const response = await fetch(`${host}/auth/createuser`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      if (json.success) {
         localStorage.setItem('token', json.theToken);
         navigate("/");
         props.showAlert("Account created successfully", "success");
      }
      else {
         props.showAlert("Invalid Credentials", "danger");
      }
   }

   const changeFunc = (element) => {
      setCredentials({ ...credentials, [element.target.name]: element.target.value })
   }

   return (
      <div className='container my-5'>
         <form onSubmit={submitFunc}>
            <div className="mb-3">
               <label htmlFor="name" className="form-label">Name</label>
               <input type="text" className="form-control" name='name' id="name" onChange={changeFunc} required/>
            </div>
            <div className="mb-3">
               <label htmlFor="email" className="form-label">Email address</label>
               <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={changeFunc} required/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
               <label htmlFor="password" className="form-label">Password</label>
               <input type="password" className="form-control" name='password' id="password" onChange={changeFunc} minLength={5} required/>
            </div>
            <div className="mb-3">
               <label htmlFor="cpassword" className="form-label">Confirm Password</label>
               <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={changeFunc} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
         </form>
      </div>
   )
}

export default Signup