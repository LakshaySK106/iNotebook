import React, { useContext, useEffect, useRef, useState } from 'react'
import Notecontext from "../context/notes/noteContext";
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";

const Notes = (props)=> {
   const context = useContext(Notecontext);
   let navigate = useNavigate();
   const { notes, getNote, editnote } = context;
   useEffect(() => {
      if(localStorage.getItem('token'))
      {
         getNote();
      }
      else
      {
         navigate("/login")
      }
      // eslint-disable-next-line

   }, [])
   const ref = useRef(null)
   const refClose = useRef(null)

   const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

   const changeFunc = (element) => {
      setNote({ ...note, [element.target.name]: element.target.value })
   }
   const updateFunc = (element) => {
      editnote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success");

   }

   const updateNote = (curNote) => {
      ref.current.click();
      setNote({ id: curNote._id, etitle: curNote.title, edescription: curNote.description, etag: curNote.tag })
   }


   return (
      <>
         <AddNote showAlert={props.showAlert} />
         <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
               <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        <form>
                           <div className="mb-3">
                              <label htmlFor="etitle" className="form-label">Title</label>
                              <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="etitleHelp" value={note.etitle} onChange={changeFunc} required />
                           </div>
                           <div className="mb-3">
                              <label htmlFor="edescription" className="form-label">Description</label>
                              <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={changeFunc} required />
                           </div>
                           <div className="mb-3">
                              <label htmlFor="etag" className="form-label">Tag</label>
                              <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={changeFunc} required />
                           </div>
                        </form>
                     </div>
                     <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={updateFunc} >Update Note</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='row my-4'>
            <h2>Your Notes</h2>
            <div className='conatiner mx-2'>
               {notes.length===0 && "No notes to display!"}
            </div>
            {notes.map((note) => {
               return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
            })}
         </div>
      </>
   )
}

export default Notes