import React from 'react'
import Notes from './Notes'

export default function Home(xyz) {
   const {showAlert} = xyz;
   return (
      <>
      <div>
         <Notes showAlert={showAlert}/>
      </div>
      </>
   )
}
