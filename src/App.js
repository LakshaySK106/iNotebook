import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'
import About from './components/About';
import Notestate from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null); 
    }, 1500);
  }

  return (
    <>
      <Notestate>
        <BrowserRouter>
            <Navbar />
            <Alert alert={alert}/>
         <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
         </div>
        </BrowserRouter>
      </Notestate>
    </>
  );
}
export default App;
