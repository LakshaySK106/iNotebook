import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
   const host = "http://localhost:5000";
   let navigate = useNavigate();

   const [credentials, setCredentials] = useState({email:"", password:""})

   const submitFunc = async (element)=>{
      element.preventDefault();
      const response = await fetch(`${host}/auth/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      if(json.success)
      {
         localStorage.setItem('token', json.theToken);
         props.showAlert("Logged in successfully", "success");
         navigate("/");
      }
      else
      {
         props.showAlert("Invalid Credentials", "danger");
      }
   }

   const changeFunc = (element) => {
      setCredentials({ ...credentials, [element.target.name]: element.target.value })
   }

   return (
      <div className='container my-5'>
         <h2>Login to continue to iNotebook</h2>
         <form onSubmit={submitFunc}>
            <div className="mb-3">
               <label htmlFor="Email" className="form-label">Email address</label>
               <input type="email" className="form-control" id="email" value={credentials.email} onChange={changeFunc} name='email' aria-describedby="emailHelp"/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
               <label htmlFor="Password" className="form-label">Password</label>
               <input type="password" className="form-control" id="password" value={credentials.password} onChange={changeFunc} name='password'/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
         </form>
      </div>
   )
}

export default Login