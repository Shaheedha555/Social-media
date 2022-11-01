import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { pink } from '@mui/material/colors';
export default function Radiogroup(props) {
  const {name,value,handlechange} = props;
  return (
    <div style={{width:'250px'}}>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{color:'black',fontSize:'12px','&$focused': {
      color: 'black', '&$disabled': {
      color: 'black',
    },
    '&$error': {
      color: 'black',
    },
    },}}>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name} 
        onChange={handlechange}
        defaultValue="female"
        value={value}
        >
        <FormControlLabel value="female"  control={<Radio  sx={{
    color: 'black',
    '&.Mui-checked': {
      color: 'black',
     
    },'& .MuiSvgIcon-root': {
            fontSize: 16,
          }
  }}/>} label="Female" sx={{fontSize:'7px'}} />
        <FormControlLabel value="male" control={<Radio sx={{
    color: 'black',
    '&.Mui-checked': {
      color: 'black',
      
    },'& .MuiSvgIcon-root': {
            fontSize: 16,
          }
  }} />} label="Male" />
        <FormControlLabel value="other" control={<Radio sx={{
    color:'black',
    '&.Mui-checked': {
      color: 'black',
        
    },
    '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
  }}/>} label="Other" />
        
      </RadioGroup>
    </FormControl>
    </div>
  );
}
