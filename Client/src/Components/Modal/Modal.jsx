import React, { useState } from 'react'
import './Modal.scss'
// When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//     if (event.target == modal) {
//       display = "none";
//     }
//   }
import {useNavigate} from 'react-router-dom'
import Button from '../Controls/Button/Button'
import { useDispatch } from 'react-redux'
import {sendOTP,verifyOTP} from '../../Features/Verify/verifySlice'
import { useEffect } from 'react'


function Modal(props) {
    // const navigate = useNavigate()
    const {user:{contact,email,name}} = props
    const [display,setDisplay] = useState('block')
    const [method,setMethod] = useState('email')
    const [modal,setModal] = useState(true)
    const [error,setError] = useState(false)
    const [errMsg,setErrMsg] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
        setErrMsg(false)
        setErrMsg('')
    },[])
    const onClick = async (e) => {
        e.preventDefault()
        let response;
         switch (method) {
            case 'email':
               response = await dispatch(sendOTP(email));
               console.log(response);
               console.log(response.payload.status);
               if(response.payload.status) setModal(false)
               else {
                setError(true)
                
                setErrMsg(response.payload.message)
                console.log(errMsg);
            }
               break;
            case 'contact':
                response = await dispatch(sendOTP(contact));
               console.log(response);
               console.log(response.payload.status);
               if(response.payload.status) setModal(false)
               else {
                setError(true)
                
                setErrMsg(response.payload.message)
                console.log(errMsg);
            }
               break;
        
        }

        console.log('method' ,'=',method)

    }
    if(modal)
  return (
    <div>
        <div>
        <h2>{name}</h2>
        <h4>{email}</h4>
      <button onClick={()=>{setDisplay("block")
    
}} id="myBtn">Verify Account</button>
</div>

          <div style={{ display: display }} id="myModal" className="modal">

              <div className="modal-content">
                  <div className="modal-header">
                      <span onClick={() => {
                          setDisplay("none")

                      }} className="close">&times;</span>
                      <h2>Verify your account</h2>
                  </div>
                    <form  action="">
                  <div className="modal-body">
                  {error && <div className='error-alert'>{errMsg == /^Invalid/ ? "Invalid Number" : "Something went wrong"} </div>}

                      <div className="radio-grp">

                          <input onClick={()=>{setMethod('email')}}  name={'method'} type={'radio'} checked={ method == 'email' ? true : false }  value={method} id='email' />
                          <label for='email' ><span>Email</span>({email})</label>
                      </div>
                      <div className="radio-grp">

                          <input onClick={()=>{setMethod('contact')}}  name={'method'} type={'radio'} id='contact' value={method}/>
                          <label for='contact' ><span>Mobile</span>({contact})</label>
                      </div>
                  </div>
                  <div className="modal-footer">
                      <Button onclick={onClick}  class="primarySmall">Send OTP</Button>
                  </div>
                  </form>
              </div>

          </div>
    </div>
  )
  if(!modal)
  return(
    <OTPmodal onclick={()=>{setModal(true)}} method={method} data={ method ==='email' ? email : contact}/>
  )
}

export const OTPmodal = (props) =>{
    const [display,setDisplay] = useState('block')
    const {method,data,onclick} = props ;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otp,setOtp] = useState({
        otp1 : '',
        otp2 : '',
        otp3 : '',
        otp4 : '',
        otp5 : '',
        otp6 : ''
      })
    
      function handleChange ( e) {
        const { name,value} = e.target;
        console.log(value,name);
        setOtp((prev)=>{
             return {
                
                    ...prev,
                 [name] : value
                 
             }
            })
      }
    
     async function handleSubmit(e) {
    
        e.preventDefault();
        let OTP = Object.values(otp).join("")
        // if(OTP.length < 6) OTP = OTP.padStart(6,'0')
        console.log(OTP , data );
        const result = await dispatch(verifyOTP({OTP,data}))
        console.log(result);
        if(result.payload.status === true) navigate('/')
        else navigate('/verify')

      }
    
      const inputfocus = (elmnt) => { 
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
          const next = elmnt.target.tabIndex - 2;
          if (next > -1) {
    
            elmnt.target.form.elements[next].focus()
          }
        }
        else {
          console.log("next");
         
            const next = elmnt.target.tabIndex;
            if (next < 6) {
              elmnt.target.form.elements[next].focus()
            }
        }
    
      }
  return (
      <div>
          {/* <button onClick={() => {
              setDisplay("block")

          }} id="myBtn">Open Modal</button> */}

          <div style={{ display: display }} id="myModal" className="modal">

              <div className="modal-content2">
                  <div className="modal-header">
                      <span onClick={onclick} className="close">&times;</span>
                      <h2>Verify your account</h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                          <div className="otpContainer">

                              <input
                                  name="otp1"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otp.otp1}
                                  // onKeyPress={keyPressed}
                                  onChange={e => handleChange(e)}
                                  tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

                              />
                              <input
                                  name="otp2"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otp.otp2}
                                  onChange={e => handleChange(e)}
                                  tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

                              />
                              <input
                                  name="otp3"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otp.otp3}
                                  onChange={e => handleChange(e)}
                                  tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

                              />
                              <input
                                  name="otp4"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otp.otp4}
                                  onChange={e => handleChange(e)}
                                  tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
                              />

                              <input
                                  name="otp5"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otp.otp5}
                                  onChange={e => handleChange(e)}
                                  tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e)}
                              />
                              <input
                                  name="otp6"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otp.otp6}
                                  onChange={e => handleChange(e)}
                                  tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e)}
                              />
                          </div>
                      </div>
                      <div className="modal-footer">
                      <Button  class="primarySmall">Resend OTP</Button>

                      <Button  class="primarySmall">Verify OTP</Button>
                      </div>
                  </form>
                  {/* <form action=""> */}

                  {/* <label htmlFor="otp">
                                  OTP
                              </label>
                              <input onChange={(e)=>{setOtp(e.target.value)}} value={otp} type="number" id='otp' name='otp' />
                      </div>
                      <Button onclick={onClick}  classname="primarySmall">Verify OTP</Button>
                    </div>  */}
                  {/* </form> */}
              </div>

          </div>

      </div>
    
    )
}

export default Modal
