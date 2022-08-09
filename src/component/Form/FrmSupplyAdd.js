import React , {useState} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid , Button , TextField , FormGroup , FormControlLabel , Switch , Alert , AlertTitle} from '@mui/material';
import endpoint from '../../api/endpoint';

const FrmSupplyAdd = () => {

  const [supName , setSupName] = useState('');
  const [supCode , setSupCode] = useState('');
  const [supPrice , setSupPrice] = useState('');
  const [chkSwitch , setchkSwitch] = useState(true); 
  const [valid , setValid] = useState(false);
  const [successData , setSuccessData] = useState(false);
  let navicate = useNavigate();
  const changeSwitch = () => {

    setchkSwitch(!chkSwitch)

  }
  const submitForm = async (e) => {

        e.preventDefault();
        if(supName && supCode && supPrice){

             try {

                const response = await endpoint.post("/supply" , {supplyname:supName , supplycode:supCode , supplyprice:supPrice , status:chkSwitch});     
                if(response.data.code === 1){

                    setSupName('')
                    setSupCode('')
                    setSupPrice('')
                    setSuccessData(true)
                    setTimeout(function() {setSuccessData(false)}, 2500);
                    setTimeout(function() {navicate("/backend/supply")}, 3000);
                    

                }           
                
             } catch (error) {
                console.error(error)
             }


        }else{


            setValid(true)
            setTimeout(function() {setValid(false)}, 3500);
        }

  }
  
  return (<>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/supply"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                        
                <form style={{width:"100%"}} onSubmit={submitForm}>
                {
                            valid ? 
                            <Alert severity="error" sx={{mt:2 , mr:2 , ml:2}}>
                            <AlertTitle>กรุณากรอกข้อมูล</AlertTitle>
                                กรอกข้อมูล <strong>ตามจำนวน ฟิลด์ที่ระบุ</strong>
                            </Alert>
                            :null
                }
                {
                            successData ? 
                            <Alert severity="success">
                            <AlertTitle>เพิ่มข้อมูลเรียบร้อย</AlertTitle>
                                ระบบ <strong>เพิ่มข้อมูลตามที่ต้องการแล้ว</strong>
                            </Alert>
                            :null

                }
                <Grid item xs={12} sx={{p:2}}>
                        <TextField id="supname" 
                        label="ชื่อบริษัทขนส่ง" 
                        variant="filled" 
                        value={supName} 
                        onChange={(e) => setSupName(e.target.value)} 
                        fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <TextField 
                            id="supcode" 
                            label="โค๊ตบริษัท" 
                            variant="filled" 
                            value={supCode}
                            onChange={(e) => setSupCode(e.target.value) }
                            fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <TextField 
                            id="supprice" 
                            label="ราคาขนส่ง" 
                            variant="filled" 
                            value={supPrice}
                            onChange ={(e) => setSupPrice(e.target.value)}
                            fullWidth />
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch  checked={chkSwitch} onChange={changeSwitch} />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                        <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
                </form>
            </Grid>
         </>
  )
}

export default FrmSupplyAdd