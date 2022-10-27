import React from 'react'

import './Button.scss'
function Button(props) {
  return (
    <div>
      <button type='submit' className={props.class} onClick={props.onclick}>{props.children}</button>
    </div>
  )
}

export default Button
