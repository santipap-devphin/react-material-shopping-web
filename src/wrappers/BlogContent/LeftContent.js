import React from 'react';
import { Stack , TextField , InputAdornment , Typography , Chip} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const LeftContent = () => {
  return (
        <Stack spacing={2} sx={{color:"#000"}}>
                <Typography variant='h6'>Categories</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="lorem ipsum" />
                    <FormControlLabel control={<Checkbox  />} label="lorem ipsum" />
                    <FormControlLabel control={<Checkbox  />} label="lorem ipsum" />
                    <FormControlLabel control={<Checkbox  />} label="lorem ipsum" />
                </FormGroup>
                <Typography variant='h6' sx={{pt:2 , pb:2}}>Tag</Typography>
                <Stack direction="row" spacing={1}>

                    <Chip label="Blank" />
                    <Chip label="Blank" />
                 </Stack>
               
        </Stack>
  )
}

export default LeftContent