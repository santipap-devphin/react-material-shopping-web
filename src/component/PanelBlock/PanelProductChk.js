import React , {Fragment , useState , useEffect} from 'react';
import {Stack , Box , Typography , Button  , Grid , TextField ,InputLabel , MenuItem , FormControl , Select , IconButton} from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import DrafDialog from '../Dialog/DrafDialog';
import endpoint from '../../api/endpoint';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const PanelProductChk = ({listCheckout , setListCheckout}) => {

  let sumtotal = 0;
  const [openModal , setOpenModal] = useState(false);
  const [supName , setSupName] = useState(listCheckout.deliver.supID);
  const [listSup , setListSup] = useState([]);
  const [objSupName , setObjSupName] = useState({});
  const [refresh , setRefresh] = useState(true);
  const [txtEtc , setTxtEtc] = useState('');
  const [statusAdd , setStatusAdd] = useState(false);

  const sumProduct = () => {

    let last = 0;

    if ('prdOrder' in listCheckout){
 
       listCheckout.prdOrder.forEach(pro => {
 
         last += Number(pro.prdPriceLast) * Number(pro.qty);
         
     
       });

       return last;
 
    }


  }

  const confirmChange = () => {

        setRefresh(false);
        var sunNew = 0;

        sunNew = Number(sumProduct()) + Number(objSupName.supPrice) -  Number(listCheckout.coupon.couPrice);
        setListCheckout({...listCheckout , deliver: objSupName , orderSum : sunNew})
        setOpenModal(false);
        setRefresh(true);

  }
  const changeSup = () => {

    setOpenModal(true)

  }
  const changeData = (value) =>{

    setSupName(value)

    const finds = listSup.find((data) => data.id === Number(value))
 
    setObjSupName({...objSupName , supID:finds.id , supName:finds.supplyname, supPrice : Number(finds.supplyprice)})

    //console.log(finds)

  }
  useEffect(() => {
    

    const fetchSupply = async () => {
        
        try {
            const response  = await endpoint.get("/supply");
            if(response.data.code === 1){

                console.log(response)
                setListSup(response.data.list)
            }
            
        } catch (error) {
            console.error(error)
        }

    }

    fetchSupply();


  }, [])

  const addTxtEtc = () => {

    if(txtEtc !== ""){

        setListCheckout({...listCheckout , etc: txtEtc})
        setTxtEtc('');
        setStatusAdd(true)

    }else{
        alert("กรุณากรอกข้อมุล")
    }
  }
  const delEtc = () => {

    setListCheckout({...listCheckout , etc: ''})
    setStatusAdd(false)

  }


  return (  <Fragment>
                <Box sx={{backgroundColor:"#030f27" , color:"#dfb163"  , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                        <Grid container>
                                <Grid item xs={4} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2}>
                                        <Stack direction="row">
                                        <StorefrontIcon sx={{fontSize:32 , color:"#dfb163" , mr:0.5}} /> <Typography variant='h6'>สินค้าที่สั้งซื้อ</Typography>
                                        </Stack>

                                    </Stack>

                                </Grid>
                                <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                </Grid>
                                <Grid item xs={2} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography variant='p'>ราคาต่อหน่วย</Typography>
                                </Grid>
                                <Grid item xs={2} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography variant='p'>จำนวน</Typography>
                                 </Grid>
                                <Grid item xs={2} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography variant='p'>รวม</Typography>
                                </Grid>
                        </Grid>  
                    </Box>
                    <Box sx={{backgroundColor:"#f5f0e0" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , color:"#000"}}>
                        {
                            listCheckout.prdOrder.length > 0 ? 
                            listCheckout.prdOrder.map((product , index) => {
                               sumtotal += Number(product.prdPriceLast) * Number(product.qty);
                               return <Grid key={index} container>
                                            <Grid item xs={4} sx={{pt:1 ,pb:1}}>
                                                <Stack spacing={2}>
                                                        <Stack direction="row" sx={{p:1}}>
                                                            <img src={product.prdImage} style={{width:100 , height:100}} alt="รูปภาพ text"/>   
                                                            <Typography variant='p' sx={{ml:1}}>{product.prdTitle}</Typography>
                                                        </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                            </Grid>
                                            <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                {product.prdPriceLast}
                                            </Grid>
                                            <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                {product.qty}
                                            </Grid>
                                            <Grid item xs={2} sx={{pt:1 ,pb:1}} textAlign="center">
                                                { Number(product.prdPriceLast) * Number(product.qty)}
                                            </Grid>
                                    </Grid>

                            })
                            
                          :null
                        }
                        
                    </Box>
                    <Box sx={{backgroundColor:"#f5f0e0" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)" , color:"#000"}}>
                            
                            <Grid container>
                                    <Grid item xs={4} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                            <Stack direction="row">
                                                 <TextField id="txtetc" 
                                                    label="ฝากข้อความถึงผู้ขาย" 
                                                    variant="filled" 
                                                    size='small' 
                                                    value={txtEtc}
                                                    onChange={(e) => setTxtEtc(e.target.value)}
                                                    sx={{ml:2 ,mr:2}} 
                                                 fullWidth/>
                                                 <Button variant="contained" color="info" sx={{mr:1}} onClick={addTxtEtc}>เพิ่ม</Button>
                                            </Stack>

                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2} sx={{pt:1 ,pb:1}}>
                                        <Typography variant='p' sx={{fontSize:18}}>บริษัทขนส่ง</Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                                <Typography>บริษัทขนส่ง { refresh ? listCheckout.deliver.supName : null}</Typography>
                                                <Typography>จะได้รับสินค้า 3 วันหลังจากสั้งซื้อ</Typography>
                                        </Stack>

                                    </Grid>
                                    <Grid item xs={3} sx={{pt:1 ,pb:1}}>
                                        <Stack spacing={2}>
                                                 <Stack direction="row" justifyContent="center" spacing={6}>
                                                    <Button variant="outlined" color="warning" onClick={changeSup}>เปลื่ยน</Button>
                                                    <Typography>{listCheckout.deliver.supPrice}</Typography>
                                                 </Stack>
                                         </Stack>
                                    </Grid>
                            </Grid>
                            {
                                statusAdd || listCheckout.etc !== "" ?
                                <Grid container sx={{backgroundColor:"#ffffff"}}>
                                    <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                        <Typography>ข้อความเพิ่มเติม</Typography>
                                    </Grid>
                                    <Grid item xs={8} sx={{pt:1 ,pb:1}} textAlign="center">
                                        <Typography>{listCheckout.etc}  </Typography>
                                      
                                    </Grid>
                                    <Grid item xs={1} sx={{pt:1 ,pb:1}} textAlign="center">
                                        <IconButton aria-label="delete" sx={{color:"red"}} onClick={delEtc}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Grid>
                                    
                                </Grid>
                                :null
                            }
                            
                            <Grid container sx={{backgroundColor:"#e6f4f6"}}>
                                <Grid item xs={3} sx={{pt:1 ,pb:1}} textAlign="center">
                                    <Typography>ยอดสั้งซื้อทั้งหมด</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{pt:1 ,pb:1}} textAlign="center">
                                     <Typography>{sumtotal + Number(listCheckout.deliver.supPrice)}</Typography>
                                </Grid>
                            </Grid>
                    </Box>
                    <DrafDialog open={openModal} setOpen={setOpenModal} title={"เปลื่ยนบริษัทขนส่ง"}  confirm={() => confirmChange()}>

                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">ชื่อบริษัทขนส่ง</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={supName}
                            onChange={(e) => changeData(e.target.value)}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                                {
                                    listSup.length > 0 ?
                                        listSup.map((name , index) => {

                                            return <MenuItem key={index} value={name.id}>{name.supplyname}</MenuItem>

                                        })
                                    :null
                                }
                            </Select>
                        </FormControl>

                   </DrafDialog>
            </Fragment>
  )
}

export default PanelProductChk