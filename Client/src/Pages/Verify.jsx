import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/Header';
import Modal from '../Components/Modal/Modal2'

function Verify() {
    const store  = useSelector((state)=>state.auth);
    const user = store.user
    // const userDetails = localStorage.getItem('user')
    console.log(user);
  return (
    <div>
      {/* <Header/> */}
      <Modal  user={user} />
    </div>
  )
}

export default Verify
