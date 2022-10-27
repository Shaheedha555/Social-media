import React, { useEffect, useState } from 'react'
import { Box, FormLabel, InputBase } from '@mui/material'
import './Input.scss'
import {BsCheck} from 'react-icons/bs'
// import {TiTimes} from 'react-icons/ti'
import {AiOutlineInfoCircle} from 'react-icons/ai'

function Input(props) {

    const {name,placeholder,handlechange,value,type,valid,focus,blur,msgClass,msg,userPresent} = props
  const [warning,setWarning] = useState(null)  
  useEffect(() => {
    if (userPresent) {
      console.log('user present')
      setWarning('User already present')
    }else{
      setWarning(null)
    }
    // else console.log('user not present'); 
  }, [userPresent])
// useEffect(()=>{
//   setWarning(null)
// },[userPresent])
  return (
    <div className='input-container'>
       <label htmlFor={name} >
        <BsCheck className={valid ? "valid" : "hide"}/>
        {placeholder}
       </label>
       <input onFocus={focus} onBlur={blur} type={type} id={name}  name={name} onChange={handlechange} />
       { msg && <p id="uidnote" className={msgClass}>
            <AiOutlineInfoCircle /> 
          {msg}
          </p>}
          {warning && <p style={{color:'red'}}>User already present in this name</p>}
    </div>
  )
}

export default Input
