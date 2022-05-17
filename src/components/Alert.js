import React from 'react'

function Alert(xyz) {
  const capt = (word) => {
    if(word==="danger")
    {
      word = "Error"
    }
    const str = word.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div style={{height: "30px"}}>
     { xyz.alert && <div className={`alert alert-${xyz.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capt(xyz.alert.type)}</strong>: {xyz.alert.msg}
      </div>}
    </div>
  )
}

export default Alert