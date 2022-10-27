import React from 'react'
import { useStore } from 'react-redux'
import Header from '../Components/Header';
import Modal from '../Components/Modal/Modal2'

function Verify() {
    const store  = useStore();
    const data = store.getState()
    const user = data.auth.user
    const userDetails = localStorage.getItem('user')
    console.log(userDetails.email, userDetails.contact);
  return (
    <div>
      {/* <Header/> */}
      <Modal  user={user} />
    </div>
  )
}

export default Verify
