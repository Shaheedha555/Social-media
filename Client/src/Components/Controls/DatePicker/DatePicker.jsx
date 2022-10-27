import { FormLabel } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { DatePicker } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
// import '../../Components/Controls/Input/Input.scss'
import './DatePicker.scss'



function DatePicker(props) {
  const {name,value,handlechange} = props;
  return (
  
      <div className='input-container'>
        <label className={value && 'filled'} htmlFor="date">Birth Date
        </label>
          <input name={name} value={value || " " } id='date' type="date"  onChange={handlechange}/>
{/* <Datepicker name={name} id='date' value={value || " " } placeholderText={value} onChange={handlechange}></Datepicker> */}
      </div>
  )
}

export default DatePicker
