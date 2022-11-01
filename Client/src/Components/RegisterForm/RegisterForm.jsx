import { Box, ButtonBase, Container, Grid, InputBase, TextField, Typography } from '@mui/material'
import React, { useState,useEffect,useRef } from 'react'
import styled from '@emotion/styled'
import '../RegisterForm/RegisterForm.scss'
import Button from '../Controls/Button/Button'
import Input from '../Controls/Input/Input'
import Checkbox from '../Controls/Checkbox/CheckBox'
import DatePicker from '../Controls/DatePicker/DatePicker'
import Radiogroup from '../Controls/Radio/RadioGroup'
import Select from '../Controls/Select/Select'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { FaUser } from 'react-icons/fa'
import { register, reset } from '../../Features/Auth/authSlice'
// import Spinner from '../components/Spinner'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import Modal from '../Modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../Axios'
import LoadingSpinner from '../LoadingSpinner/Spinner'


const USER_REGEX = /^[A-z][A-z0-9-_!@#$&()-`.+,*" ]{3,23}$/;
const USERNAME_REGEX = /^[A-z][A-z0-9_]{4,15}$/;

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const CONTACT_REGEX = /^[0-9+]{10,13}$/;
const PWD_REGEX = /^[a-zA-Z0-9!@#$&()-`.+,*"]{5,15}$/;

function RegisterForm() {
    const [data, setData] = useState({
      name : "",
      username : "",
      email : "",
      password :"",
      matchPwd:"",
      contact : "",
      birthDate : new Date().toISOString().slice(0,10),
      gender : "female",
      country : "",
      about : ""
    });
  
    const dispatch = useDispatch()
    const errRef = useRef();

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validContact, setValidContact] = useState(false);
    const [contactFocus, setContactFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [userPresent,setUserPresent] = useState(false)

    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate()
    
    useEffect(() => {
        setValidName(USER_REGEX.test(data.name));
    }, [data.name])
    useEffect(() => {
      setValidUsername(USERNAME_REGEX.test(data.username));

  }, [data.username])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(data.email));
    }, [data.email])
    useEffect(() => {
        setValidContact( CONTACT_REGEX.test(data.contact));
    }, [data.contact])
    useEffect(() => {
      setValidPwd(PWD_REGEX.test(data.password));
      setValidMatch(data.password === data.matchPwd);
  }, [data.password, data.matchPwd])
    useEffect(() => {
        setErrMsg('');
    }, [data.name,data.username,data.email,data.contact, data.password, data.matchPwd])

    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
    useEffect(() => {
      if (isError) {
        setErrMsg('Registration Failed')
      }
  
      if (isSuccess || user) {
        console.log('home');
        navigate('/verify')
      }
      
      dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch])

    useEffect(()=>{
        axios.post('/searchUsername',({username:data.username}))
        .then((res)=>{
          console.log(res.data.status,'  searching..');
          if(!res.data.status) setUserPresent(true)
          else setUserPresent(false)
        })
    },[data.username])
    function handlechange(e) {
     const {name,value} = e.target;
      setData((prevValue)=>{
        return {
          ...prevValue,
          [name] : value
        }
      })
  
    }
    const onSubmit = async (e)=>{
      e.preventDefault()
      const v1 = USER_REGEX.test(data.name);
      const v2 = USERNAME_REGEX.test(data.username);
      const v3 = PWD_REGEX.test(data.password);
      const v4 = EMAIL_REGEX.test(data.email);
      const v5 = CONTACT_REGEX.test(data.contact);
      // console.log(v1,v2,v3,v4,v5 , data.password===data.matchPwd , data.password,data.matchPwd); 
      if (!v1 || !v2  || !v3 || !v4 || !v5 || userPresent) {
          setErrMsg("Invalid Entry");
          return;
      }

      const response = await dispatch(register(data))
          console.log('submitted' , response.payload);

        if(response.payload.status){
          localStorage.setItem('user',JSON.stringify(response.payload))
          console.log('verify');
          navigate('/verify');
        }else{
          setErrMsg(response.payload.message)
        }
        
    }
   
        const msgs = ["  4 to 23 characters.Must begin with a letter.",
                      "5 to 15 characters.Must begin with a letter.Letters,numbers, underscores allowed.",
                      "Must be in the format example@gmail.com",
                      " 5 to 15 characters.",
                      "Must match the first password input field.",
                      "Must be in the format +919999999999 or 9999999999."]

    return(
      <div className='form-container'>
        {isLoading && <LoadingSpinner /> }
       
      <h2 className='title'>Sign Up</h2>
      <div>
        <form onSubmit={onSubmit} action="" >
          <p 
          ref={errRef} 
          className={errMsg ? "errmsg" : "offscreen"} 
          aria-live="assertive">{errMsg}</p>

            <div className="user-details">
              <Input
                msgClass={userFocus && data.name && !validName ? "instructions" : "offscreen"}
                msg={msgs[0]}
                focus={() => setUserFocus(true)}
                blur={() => setUserFocus(false)}
                type="text" valid={validName ? true : false}
                name="name"
                placeholder="Name"
                value={data.name}
                handlechange={handlechange}
              />


              <Input
                msgClass={usernameFocus && data.username && !validUsername ? "instructions" : "offscreen"}
                msg={msgs[1]}
                focus={() => setUsernameFocus(true)}
                blur={() => setUsernameFocus(false)}
                type="text"
                valid={validUsername ? true : false}
                name="username"
                placeholder="Username"
                value={data.username}
                handlechange={handlechange}
                userPresent={userPresent}
              />


              <Input
                msgClass={emailFocus && data.email && !validEmail ? "instructions" : "offscreen"}
                msg={msgs[2]}
                focus={() => setEmailFocus(true)}
                blur={() => setEmailFocus(false)}
                type="email"
                valid={validEmail ? true : false}
                name="email"
                placeholder="Email"
                value={data.email}
                handlechange={handlechange}
              />

              <Input
                msgClass={contactFocus && data.contact && !validContact ? "instructions" : "offscreen"}
                msg={msgs[5]}
                focus={() => setContactFocus(true)}
                blur={() => setContactFocus(false)}
                name="contact"
                type="number"
                valid={validContact ? true : false}
                placeholder="Contact"
                value={data.contact}
                handlechange={handlechange}
              />

              <Input
                msgClass={pwdFocus && data.password && !validPwd ? "instructions" : "offscreen"}
                msg={msgs[3]}
                focus={() => setPwdFocus(true)}
                blur={() => setPwdFocus(false)}
                type="password"
                valid={validPwd ? true : false}
                name="password"
                placeholder="Password"
                value={data.password}
                handlechange={handlechange}
              />

              <Input
                msgClass={matchFocus && data.matchPwd && !validMatch ? "instructions" : "offscreen"}
                msg={msgs[4]}
                focus={() => setMatchFocus(true)}
                blur={() => setMatchFocus(false)}
                type="password"
                valid={validMatch && data.matchPwd ? true : false}
                value={data.matchPwd}
                name="matchPwd"
                placeholder="Confirm Password"
                handlechange={handlechange}
              />



             

              {/* <Input
                msgClass='offscreen'
                name="about"
                valid={false}
                placeholder="About"
                value={data.about}
                handlechange={handlechange}
              /> */}
              <DatePicker
                name="birthDate"
                value={data.birthDate}
                handlechange={handlechange}
              />
                <Select
                  name="country"
                  value={data.country}
                  handlechange={handlechange}
                />
              <Radiogroup
                name="gender"
                value={data.gender}
                handlechange={handlechange}
              />

            </div>
            <div style={{margin:'0 auto',textAlign:'center'}}>
              <Button class="primaryLarge" >Sign Up</Button>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
          <p>Already have an account ? </p> 
          <Button class='primarySmall' onclick={()=>navigate('/login')} > Log In</Button>
        </div>
              </div>
        </form>
      </div>
       
    </div> 
    )
  
    
  
    
}

export default RegisterForm
