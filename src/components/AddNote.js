import React, { useContext, useState } from 'react'
import Notecontext from "../context/notes/noteContext";

const Addnote = (props) => {
   const context = useContext(Notecontext);
   const { addnote } = context;

   const [note, setNote] = useState({title:"", description:"", tag: ""})
   const changeFunc = (element)=>{
      setNote({...note, [element.target.name]: element.target.value})
   }

   const submitFunc = (element)=>{
      element.preventDefault();
      addnote(note.title, note.description, note.tag)
      setNote({ title: "", description: "", tag: "" })
      props.showAlert("Added note Successfully", "success");
   }

  return (

     <div className='container my-5'>
        <form>
           <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' aria-describedby="titleHelp" value={note.title} onChange={changeFunc} />
           </div>
           <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={changeFunc} />
           </div>
           <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={changeFunc} />
           </div>
           <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={submitFunc}>Add Note</button>
        </form>
     </div>
  )
}

export default Addnote