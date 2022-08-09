import React , {useState , useRef} from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , TextField , Button  , Alert , FormGroup , FormControlLabel , AlertTitle}  from '@mui/material';
import Switch from '@mui/material/Switch';
import endpoint from '../../api/endpoint';

const FrmAddSize = () => {

 const [nameSize , setNameSize] = useState('');
 const [nameSizeEn , setNameSizeEn] = useState('');
 const [sizeDetail, setSizeDetail] = useState('');
 const [chkSwitch , setchkSwitch] = useState(true); 
 const [valid , setValid] = useState(false);
 const [successData , setSuccessData] = useState(false);

  const myRef = useRef();

  const handleConfirm = async (e) => {

        e.preventDefault();

        if(nameSize && nameSizeEn){

            try {
                const response = await endpoint.post("/sizeproduct" , {unitname:nameSize , unitnameen:nameSizeEn , unitdetail:sizeDetail , unitstatus:chkSwitch});
                if(response.data.code === 1 ){

                    setNameSize('')
                    setNameSizeEn('')
                    setSizeDetail('')
                    setchkSwitch(true)
                    setSuccessData(true);
                    setTimeout(function() {setSuccessData(false)}, 3500);


                }
                
            } catch (error) {
                console.error(error);
            }

        }else{
            setValid(true)
            setTimeout(function() {setValid(false)}, 3500);

        }
  }
  const handleChange = () => {

    setchkSwitch(!chkSwitch)
  }
  
  return (<>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/sizeproduct"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <div ref={myRef}></div>
            <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
            
                    <Grid item xs={12} >
                        
                        {
                            valid ? 
                            <Alert severity="error">
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

                        
                   </Grid>
                
                <form onSubmit={handleConfirm} style={{width:"100%"}}>
                <Grid item xs={12} sx={{p:2}}>
                                 <TextField 
                                        id="namesize" 
                                        label="ชื่อหน่วยภาษาไทย" 
                                        variant="filled" 
                                        size="small" 
                                        value={nameSize}
                                        onChange={(e) => setNameSize(e.target.value)}
                                        fullWidth/>
                             </Grid>
                             <Grid item xs={12} sx={{p:2}}>
                                 <TextField 
                                    id="filled-basic"
                                    label="ชื่อหน่วยภาษาอังกฤษ" 
                                    variant="filled" 
                                    size="small" 
                                    value={nameSizeEn}
                                    onChange={(e) => setNameSizeEn(e.target.value)}
                                    fullWidth/>
                             </Grid>
                             <Grid item xs={12} sx={{p:2}}>
                                 <TextField id="namesizeen" 
                                    label="รายละเอียดหน่วย" 
                                    variant="filled" 
                                    rows={2}
                                    value={sizeDetail}
                                    onChange={(e) => setSizeDetail(e.target.value)}
                                    multiline
                                    fullWidth/>
                             </Grid>
                            
                            <Grid item xs={12} sx={{p:2}}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch  checked={chkSwitch}  onChange={handleChange}  />} label="สถานะเปิดใช้" />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sx={{p:2}}>
                                    <Button variant='contained' type='submit' sx={{m:1}}>ยืนยัน</Button>
                                    <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                            </Grid>
                </form>
            </Grid>
         </>
  )
}

export default FrmAddSize