import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { pink } from '@mui/material/colors';


function CheckBox(props) {
  return (
    <div>
      <FormControlLabel
      label={props.label}  control={
        <Checkbox sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}/>

      }/>
    </div>
  )
}

export default CheckBox
