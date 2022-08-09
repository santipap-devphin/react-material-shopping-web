import React from 'react';
import { Box ,Stack , Grid, Typography , Divider , Chip} from '@mui/material';
import CardOrder from '../../component/Card/CardOrder';
import months from "../../data/dates.json";

const SecOrderPendding = ({items}) => {

    const convertDate = (data) => {

        let newdate;
        let newData;
        //console.log(data)
        if(data.indexOf("_") > -1){
            
            newdate = data.split("_");
            var date = newdate[0];
            //var time = newdate[1];
    
            var redateyear =  date[0]+date[1]+date[2]+date[3];
            var redatemonth =  date[4]+date[5];
            var redateday =  date[6]+date[7];
    
            newData = redateday +" "+ months[parseInt(redatemonth)-1].nameshort +" "+ redateyear;
            //console.log(newData)
         }
    
        return newData;
      }
      
  return (
        <Box sx={{backgroundColor:"#f3f3f3"}}>
               <Divider  sx={{m:2}}>
                                <Chip label={items.orderID} sx={{fontSize:24}}  color="info"/>
                </Divider>
                <Grid container sx={{pl:2}}>
                                 <Grid item xs={12}>
                                    <Typography variant='h6'>สถานะ : 
                                    {items.status === "success" ? "สำเร็จ" 
                                                    : items.status === "error" ? "ยกเลิก" 
                                                    : items.status === "pending" ? "กำลังจัดส่ง" 
                                                        : items.status === "new" ? "รอโอนเงิน" :null}
                                    </Typography>
                                    <Typography variant='h6'>
                                        วันสั้งซื้อ {convertDate(items.orderDate)}   
                                    </Typography>
                                    {items.payment 
                                        ? <Chip label="โอนเงินแล้ว" sx={{fontSize:14}}  color="success"/> 
                                     : null 
                                    }
                                </Grid>
                                
                 </Grid>
                <Grid container spacing={2} sx={{p:1}}>
                                {
                                    items.prdOrder.map((pro , indesx) => {
                                        return  <CardOrder 
                                                        key={indesx} 
                                                        RowsP={12 / items.prdOrder.length} 
                                                        cardTitle = {pro.prdTitle}  
                                                        cardImage = {pro.prdImage}  
                                                        cardPrice={pro.prdPriceLast} 
                                                        cardQty={pro.qty}
                                                        cardEtc={pro}
                                                        
                                                />
                                    })
                                }
                               
                </Grid>
                 <Grid container sx={{p:1}} >
                                    <Grid item xs={6} sx={{p:1 , backgroundColor:"#fff" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , textAlign:"center"}}>
                                            <Typography variant='h6'>ราคาเต็ม</Typography>
                                            <Typography variant='h6'>ค่าส่ง ({items.deliver.supName})</Typography>
                                            <Typography variant='h6'>ส่วนลด</Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{p:1 , backgroundColor:"#fff" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , textAlign:"center"}}>
                                            <Typography variant='h6'>{Number(items.orderSum) + Number(items.coupon.couPrice) - Number(items.deliver.supPrice) }</Typography>
                                            <Typography variant='h6'>{Number(items.deliver.supPrice)}</Typography>
                                            <Typography variant='h6'>{Number(items.coupon.couPrice) !== 0 ? "-"+items.coupon.couPrice : items.coupon.couPrice }</Typography>
                                    </Grid>
                                </Grid>
                            <Grid container sx={{p:1 , mb:1}} >
                                 <Grid item xs={6} sx={{p:1 , backgroundColor:"#d32f2f" ,color:"#fff" ,  boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , textAlign:"center"}}>
                                        <Typography variant='h6'>ราคาสุทธิ</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{p:1 , backgroundColor:"#d32f2f" ,color:"#fff" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , textAlign:"center"}}>
                                        <Typography variant='h6'>{items.orderSum}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{pl:1 , mb:1}} >
                                <Grid item xs={12}>
                                    <Typography variant='div'>{items.etc !== "" ? "ข้อความเพิ่มเติม "+items.etc :null}</Typography>       
                                </Grid>
                </Grid>
                <Divider textAlign="right" sx={{m:2}}>
                    <Chip label="End Order" sx={{fontSize:14}} color="warning" />
                </Divider>
        </Box>
  )
}

export default SecOrderPendding