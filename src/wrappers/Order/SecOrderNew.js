import React , {useState} from 'react';
import { Box  , Grid, Typography , Divider , Chip , Button , Stack} from '@mui/material';
import CardOrder from '../../component/Card/CardOrder';
import months from "../../data/dates.json";
import DrafModal from '../../component/Modal/DrafModal';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import endpoint from '../../api/endpoint';


const SecOrderNew = ({items}) => {
    //console.log(items)
    const [openModal , setOpenModal] = useState(false);
    const [openModalCan , setOpenModalCan] = useState(false);
    const [imageUrl , setImageUrl] = useState('');
    const [imgData,setImgData] = useState('');
    const [refresh , setRefresh] = useState(true);

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
    const confirmOrder = async (id) => {

        setRefresh(false);

        try {

            const response = await endpoint.patch(`/checkout/updatenotify/${id}` ,{slip:imgData});
            console.log(response)
            if(response.data.code === 1 && response.data.orderID === items.orderID){

                items["notify"] = true;
                setOpenModal(false);
                setRefresh(true);
            }
            
            
              
          } catch (error) {
              console.error(error)
          }
       
    }
   

    const openModalConfirm =  async () => {

        setOpenModal(true)
        // เมื่อยืนยันให้ update notifly true และ ให้ admin ตรวจสอบ
    }
    const cancelOrder = () => {

        setOpenModalCan(true)


    }
    const cancelConfirm =  async (id) => {

        setRefresh(false);
        try {
         const response = await endpoint.patch(`/checkout/updatecancel/${id}`)
         if(response.data.code === 1){

            items["status"] = "cancel";
            items["payment"] = false;
            items["notify"] = false;
            setOpenModalCan(false)
            setRefresh(true);
         }
         } catch (error) {
            console.error(error)
         }
        
    }
    const changeImg =  async (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => { 

            //file["namefolder"]  = "cate";
            setImageUrl(reader.result)
        }

        reader.readAsDataURL(file) 

        //console.log(e.target.files[0])
        if(file !== null){

            const formData = new FormData()

            formData.append('file', file)
            
            const response = await endpoint.post("/upload" , formData , {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});

            if(response.status === 200 && response.statusText === "OK"){

                var newpath = response.data.destination + response.data.filename;
                console.log(newpath)
                if(newpath.indexOf("public/") > -1){

                    var sp = newpath.split("public/");
                    //console.log(sp[1])
                    setImgData(sp[1])
                    items["imgslip"] = sp[1];
                }else{
                    setImgData(newpath)
                    items["imgslip"] = newpath;
                }
            }
        }
     }
  return (<Box sx={{backgroundColor:"#f3f3f3"}}>
                <Divider  sx={{m:2}}>
                    <Chip label={items.orderID} sx={{fontSize:24}}  color="info"/>
                </Divider>
                <Grid container sx={{pl:2}}>
                        <Grid item xs={12} sm={9}>
                            <Typography variant='h6'>สถานะ : 
                            {items.status === "success" ? "สำเร็จ" 
                                            : items.status === "cancel" ? "ยกเลิก" 
                                            : items.status === "pending" ? "กำลังจัดส่ง" 
                                                : items.status === "new" ? "รอโอนเงิน" :null}
                            </Typography>
                            <Typography variant='h6'>
                                วันสั้งซื้อ {convertDate(items.orderDate)}   
                            </Typography>
                            {refresh ?
                                items.payment === false && items.notify === true
                                        ? <Chip label="แจ้งชำระแล้ว" sx={{fontSize:14}}  color="primary"/> 
                                : null 
                             :null
                            }
                        </Grid>
                        <Grid item xs={12} sm={3}>
                                {!items.payment && items.notify === false ? 
                                    <>
                                        <Button sx={{ml:1}} variant="contained" onClick={openModalConfirm}>แจ้งชำระ</Button>
                                        <Button sx={{ml:1}} variant="contained" color="error" onClick={cancelOrder}>ยกเลิก</Button>
                                    </>
                                    : null 
                                }    
                                
                        </Grid >
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
                <DrafModal open={openModal} setOpen={setOpenModal} txthead={"แจ้งชำระเงิน"} handleConfirm={() => confirmOrder(items.orderID)}>
                            <Typography variant='h6'>หมายเลขคำสั้งซื้อ {items.orderID}</Typography>
                            <Button
                            variant="contained"
                            component="label"
                            sx={{mt:0.5 , backgroundColor:"#1976d2" , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                            >
                            <FileUploadIcon/>
                             อัพโหลดสลิปโอนเงิน
                            <input
                              type="file"
                              hidden
                              onChange={changeImg}
                            />
                          </Button>
                          <Stack sx={{mt:2}}>
                          {
                            imageUrl !== '' ?  <img id="imgslip" src={imageUrl} alt="รูปภาพ default" />
                            : null
                          }
                          </Stack>
                          
                </DrafModal>
                <DrafModal open={openModalCan} setOpen={setOpenModalCan} txthead={"ยกเลิกการสั้งซื้อ"} handleConfirm={() => cancelConfirm(items.orderID)}>
                            <Typography variant='h6'>ยืนยันการยกเลิก คำสั้งซื้อ {items.orderID}</Typography>
                 </DrafModal>
            </Box>
            )
}

export default SecOrderNew