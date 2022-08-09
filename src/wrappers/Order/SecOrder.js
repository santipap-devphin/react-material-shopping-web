import React ,{useState , useEffect , useContext} from 'react';
import DataContext from '../../context/DataContext';
import { Stack , Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SecOrderNew from './SecOrderNew';
import SecOrderPendding from './SecOrderPendding';
import SecOrderComplete from './SecOrderComplete';
import SecOrderCancel from './SecOrderCancel';
import endpoint from '../../api/endpoint';


const SecOrder = () => {

  const {userLogin} = useContext(DataContext);
  const [value, setValue] = useState(0);
  const [listItems , setListItems] = useState([]);
  
  var userID = userLogin !== null ? userLogin.id : 0;

  const handleChange = (event, newValue) => {

    console.log(newValue)
    setValue(newValue);
  };

  useEffect(() => {

    let StatusCall = true;
    const reqOrders = async() =>{

        try {
            const response = await endpoint.get(`/checkout/byuser/${userID}`);
            console.log(response)
            if(response.data.code === 1){
                setListItems(response.data.list)
            }
            
        } catch (error) {
            console.error()
        }


    }

    if(StatusCall === true && userID !== 0){
        reqOrders();
    }
    return () => {

        StatusCall = false;
    }

  },[])

  return (
        <Stack spacing={1} sx={{mt:5 , mb:5}}>
           
            <Box sx={{ width: '100%', bgcolor: 'background.paper' , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="สั้งซื้อใหม่" sx={
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
                      listItems.map((itm , index) => {
                         return value === 0 && itm.status ==="new" ? <SecOrderNew key={index} items={itm} /> 
                                    : value === 1 && itm.status ==="pending" ? <SecOrderPendding key={index} items={itm}/> 
                                        : value === 2 && itm.status ==="close" ? <SecOrderComplete key={index} items={itm}/> 
                                            : value === 3 && itm.status ==="cancel" ? <SecOrderCancel key={index} items={itm}/> : null

                     })
                 }
                
             </Stack>
            </Box>
        </Stack>    
    )
}

export default SecOrder