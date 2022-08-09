import React , {useState} from 'react';
import {Box , Tabs ,Tab , Container} from '@mui/material';
import FrmLogin from './FrmLogin';
import FrmRegister from './FrmRegister';

const Main = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
            <Box sx={{ width: '100%' , pt:5 , pb:10}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                 
                <Container sx={{pt:3}}>
                 {
                 value === 0 ? 
                 <FrmLogin />
                 :
                 <FrmRegister setValue={setValue} />
                 }
                 </Container>
            </Box>
    )
}

export default Main