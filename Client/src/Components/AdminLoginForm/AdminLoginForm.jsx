import React, { useRef, useState } from 'react'
import Button from '../Controls/Button/Button'
import Input from '../Controls/Input/Input'
import {login,reset,adminLogin} from '../../Features/Auth/authSlice'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const USERNAME_REGEX = /^[A-z][A-z0-9_]{5,15}$/;

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^[a-zA-Z0-9!@#$&()-`.+,*"]{5,15}$/;

function AdminLoginForm() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [errMsg, setErrMsg] = useState('');

  const errRef = useRef();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async(e)=>{
    e.preventDefault()
   
    const v1 = EMAIL_REGEX.test(email) 
    // const v2 = USERNAME_REGEX.test(data.username);
    const v2 = PWD_REGEX.test(password);
    // const v4 = EMAIL_REGEX.test(data.email);
    // console.log(v1,v2);
    if (!v1 || !v2 ) {
        setErrMsg("Invalid Entry");
        return;
    }
    console.log(email,password);
    const response = await dispatch(adminLogin({email,password}))
          console.log('submitted' , response.payload);
        if(response.payload.status){
          localStorage.setItem('admin',JSON.stringify(response.payload))
          navigate('/admin/dashboard')
          
        }else{
          setErrMsg(response.payload.message)
        }

  }
  return (
      <div className="form-container login">
       
        <h2>Admin Login</h2> 
        <div>
            <form onSubmit={onSubmit} action="">
            <p 
          ref={errRef} 
          className={errMsg ? "errmsg" : "offscreen"} 
          aria-live="assertive">{errMsg}</p>
                {/* <div className="login-details"> */}

                <Input type="text" placeholder="Email" name='email' handlechange={(e)=>{setEmail(e.target.value)}} />
                <Input type="password" placeholder="Password" name='password' handlechange={(e)=>{setPassword(e.target.value)}} />
                <Button class="primaryLarge" >Log In</Button>
                {/* </div> */}

            </form>
        </div>
      </div>
  )
}

export default AdminLoginForm
