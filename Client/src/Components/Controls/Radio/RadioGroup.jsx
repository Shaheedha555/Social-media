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
    <FormControl >
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{color:pink[600]}}>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name} 
        onChange={handlechange}
        defaultValue="female"
        value={value}
        >
        <FormControlLabel value="female"  control={<Radio  sx={{
    color: pink[800],
    '&.Mui-checked': {
      color: pink[600],
    },
  }}/>} label="Female" />
        <FormControlLabel value="male" control={<Radio sx={{
    color: pink[800],
    '&.Mui-checked': {
      color: pink[600],
    },
  }} />} label="Male" />
        <FormControlLabel value="other" control={<Radio sx={{
    color: pink[800],
    '&.Mui-checked': {
      color: pink[600],
    },
  }}/>} label="Other" />
        
      </RadioGroup>
    </FormControl>
  );
}
