import React ,{useState} from 'react';
import { Stack , Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SecOrderAll from './SecOrderAll';
import SecOrderPendding from './SecOrderPendding';
import SecOrderComplete from './SecOrderComplete';
import SecOrderCancel from './SecOrderCancel';

const SecOrder = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {

    console.log(newValue)
    setValue(newValue);
  };

  return (
        <Stack spacing={1} sx={{mt:5 , mb:5}}>
           
            <Box sx={{ width: '100%', bgcolor: 'background.paper' , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="ทั้งหมด" sx={
                    value === 0 ? {backgroundColor:"#E5E5E5",fontSize:20} : {fontSize:20}
                } />
                <Tab label="กำลังจัดส่ง" sx={
                    value === 1 ? {backgroundColor:"#E5E5E5",fontSize:20} : {fontSize:20}
                } />
                <Tab label="จัดส่งสำเร็จ" sx={
                    value === 2 ? {backgroundColor:"#E5E5E5",fontSize:20} : {fontSize:20}
                } />
                <Tab label="ยกเลิกสินค้า" sx={
                    value === 3 ? {backgroundColor:"#E5E5E5",fontSize:20} : {fontSize:20}
                } />
            </Tabs>
             <Stack spacing={1} sx={{mt:1}}>
                 {
                     value === 0 ? 
                     <SecOrderAll />
                        : value === 1 ? <SecOrderPendding/>
                            : value === 2 ? <SecOrderComplete/>
                                : value === 3 ? <SecOrderCancel/>: ""

                 }
                
             </Stack>
            </Box>
        </Stack>    
    )
}

export default SecOrder