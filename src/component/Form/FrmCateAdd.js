import React , {useState , useRef} from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid  , Stack 
    , TextField , Button  , Alert , FormGroup , FormControlLabel , AlertTitle
     }  from '@mui/material';
import Switch from '@mui/material/Switch';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import defaultimg from "../../assets/noimg.jpg"
import endpoint from '../../api/endpoint';

const FrmCateAdd = () => {
    const [cateName , setCateName] = useState('');
    const [cateNameEn , setCateNameEn] = useState('');
    const [cateDetail , setCateDetail] = useState('');
    const [chkSwitch , setchkSwitch] = useState(true); 
    const [imageUrl, setImageUrl] = useState(null);
    const [imgData ,setImgData] = useState('');
    const [validFrm , setValidFrm] = useState(false);
    const [callSuccess , setCallSuccess] = useState(false);
    let myRef = useRef(null);
    const handleChange = (event) => {

        setchkSwitch(event.target.checked);
    }
    const handleConfirm = async(e) => {

        e.preventDefault();

        if(cateName && cateNameEn){

           console.log(cateName , cateNameEn , imgData , chkSwitch)

            try {

                const response = await endpoint.post("/addcategory" , {catename:cateName , catenameen:cateNameEn,catedetail:cateDetail, imgfile :imgData , status:chkSwitch})

                if(response.data.code === 1){

                    setCateName('');
                    setCateNameEn('');
                    setCateDetail('');
                    setImageUrl(null)
                    setImgData('');
                    window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
                    setCallSuccess(true)
                    setTimeout(function() { setCallSuccess(false)}, 4000);

                }
                
                
            } catch (error) {
                console.log(error.message);
            }

        }else{
          setValidFrm(true)
          setTimeout(function() { setValidFrm(false)}, 3000);

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

            file["namefolder"]  = "cate";

            console.log("file have" , file);

            const formData = new FormData()

            formData.append('file', file)
            
            const response = await endpoint.post("/upload" , formData , {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});

            if(response.status === 200 && response.statusText === "OK"){

                var newpath = response.data.destination + response.data.filename;

                if(newpath.indexOf("public/") > -1){

                    var sp = newpath.split("public/");
                    //console.log(sp[1])
                    setImgData(sp[1])
                }else{
                    setImgData(newpath)
                }
            }
        }
     }

  return (<>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/category"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <div ref={myRef}></div>
            <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                <form onSubmit={handleConfirm} style={{width:"100%"}}>
                {
                validFrm ? <Alert severity="error" sx={{m:2}}>กรุณากรอกข้อมูล</Alert> : null
                }
                {
                    callSuccess ? 

                    <Alert severity="success" sx={{m:2}}>
                    <AlertTitle>เพิ่มข้อมูลเสร็จสิ้น</AlertTitle>
                    <strong>ระบบได้เพิ่มหมวดหมู่เรียบร้อยแล้ว </strong>
                    </Alert>
                    :null
                }
                <Grid item xs={12} sx={{p:2}}>
                    <TextField 
                        id="catenameth" 
                        label="ชื่อหมวดหมู่ไทย" 
                        variant="filled" 
                        value={cateName}
                        onChange={(e) => setCateName(e.target.value)}
                        fullWidth />
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <TextField 
                        id="catenameen" 
                        label="ชื่อหมวดหมู่ภาษาอังกฤษ" 
                        variant="filled" 
                        value={cateNameEn}
                        onChange={(e) => setCateNameEn(e.target.value)}
                        fullWidth />    
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <TextField 
                            id="catedetail" 
                            label="รายละเอียด" 
                            variant="filled" 
                            multiline
                            rows={3}
                            onChange={(e) => setCateDetail(e.target.value)}
                            value={cateDetail}
                            fullWidth />    
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <Button
                        variant="contained"
                        component="label"
                        size="small"
                        sx={{mt:1 , backgroundColor:"#1976d2" , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                        >
                                <FileUploadIcon/>
                                <input
                                id="uploadcateimg"
                                type="file"
                                onChange={(e) => changeImg(e)}
                                hidden
                                />
                            โหลดรูป
                    </Button>      
                </Grid>
                <Stack sx={{m:1}}>
                    {
                        imageUrl !== null ?  <img id="imgcate" src={imageUrl} style={{maxWidth:"30%"}} alt="รูปภาพ default" />
                        :  <img id="imgcate" src={defaultimg} style={{maxWidth:"30%"}}  alt="รูปภาพ หมวดหมู่"/>
                    }
                
                </Stack>
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

export default FrmCateAdd