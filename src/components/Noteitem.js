import React, { useContext } from 'react'
import Notecontext from "../context/notes/noteContext";

function Noteitem(props) {
   const context = useContext(Notecontext);
   const { delnote } = context;
   const { note, updateNote } = props;

   const delFunc = ()=>{
      delnote(note._id);
      props.showAlert("Deleted Successfully", "success");
   }

   return (
      <div className='col-md-3'>
         <div className="card my-3">
            <div className="card-body">
               <h5 className="card-title">{note.title}</h5>
               <p className="card-text">{note.description}</p>
               <i className="fa-solid fa-trash-can mx-3" onClick={delFunc}></i>
               <i className="fa-solid fa-file-pen mx-3" onClick={() => { updateNote(note)}}></i>
            </div>
         </div>
      </div>
   )
}

export default Noteitem