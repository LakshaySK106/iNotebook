import Notecontext from "./noteContext";
import { useState } from "react";

const Notestate = (props) => {
   const host = "http://localhost:5000"
   const notesInitial = []
   const [notes, setNotes] = useState(notesInitial);

   const addnote = async (title, description, tag)=>{

      const response = await fetch(`${host}/notes/addnotes`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
         body: JSON.stringify({title, description, tag})
      });
      const notess = await response.json();
      setNotes(notes.concat(notess)); 
   }
   const getNote = async ()=>{

      const response = await fetch(`${host}/notes/getnotes`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
      });
      const json = await response.json();
      setNotes(json);
   }

   const delnote = async (id)=>{
      const response = await fetch(`${host}/notes/deletenotes/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
      });
      const json = await response.json();
      const newNote = notes.filter((note)=>{
         return note._id!==id
      });
      setNotes(newNote);
   }


   const editnote = async (id, title, description, tag)=>{

      const response = await fetch(`${host}/notes/updatenotes/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
         body: JSON.stringify({title, description, tag})
      });
      const json = response.json();
      
      const newNote = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNote.length; index++) {
         const element = notes[index];
         if(element._id === id){
            newNote[index].title = title;
            newNote[index].description = description;
            newNote[index].tag = tag;
            break;
         }
      }
      setNotes(newNote);
   }

   return (
      <Notecontext.Provider value={{ notes,addnote, delnote, editnote, getNote}}>
         {props.children}
      </Notecontext.Provider>
   )
}
export default Notestate;