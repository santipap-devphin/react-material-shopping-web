import React , {useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { green } from '@mui/material/colors';
import { Autocomplete ,Box , Grid  , TextField 
    , InputLabel , MenuItem , FormControl 
    , Select , Typography , Chip , CircularProgress
    , Alert , AlertTitle ,Button , Fab , FormGroup , FormControlLabel , Switch
} from '@mui/material';
import DrafDialogDefault from '../Dialog/DrafDialogDefault';
import PublishIcon from '@mui/icons-material/Publish';
import { DropzoneArea } from "material-ui-dropzone";
import ImageIcon from '@mui/icons-material/Image';
import imgdefault from "../../assets/noimg.jpg";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditorContent from '../Editor/EditorContent';

import endpoint from '../../api/endpoint';
import colors from '../../data/color.json'
import { useEffect } from 'react';

const FrmAddProduct = () => {

 const [listCate , setListCate] = useState([]);
 const [listUnit , setListUnit] = useState([]);
 const [callCate , setCallCate] = useState(false);
 const [callUnit , setCallUnit] = useState(false);
 const [objSendFrm , setObjSendFrm] = useState({})
 const [imageUrl , setImageUrl] = useState(null);
 const [cate, setCate] = useState('');
 const [titlePrd , setTitlePrd] = useState('');
 const [prdDes , setPrdDes] = useState('');
 const [unitname , setUnitname] = useState('');
 const [colorPrd , setColorPrd] = useState('');
 const [totalPrd , setTotalPrd] = useState('');
 const [pricePrd , setPricePrd] = useState('');
 const [priceLastPrd , setPriceLastPrd] = useState('');
 const [files , setfiles] = useState([]);
 const [chipData, setChipData] = useState([]);
 const [openAlertErr , setOpenAlertErr] = useState(false);
 const [openAlertSucc , setOpenAlertSucc] = useState(false);
 const [msgErr , setMsgErr] = useState({});
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);
 const [reFresh , setRefresh] = useState(true);
 const [chkSwitch , setchkSwitch] = useState(true); 
 let navicate = useNavigate();
 const timer = useRef();
 const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
 

 useEffect(() => {

    const requestCate = async () => {

        try {
            const response = await endpoint.get("/getcategory")
            if(response.status === 200 && response.statusText === "OK"){

                //console.log(response.data)
                const chks = response.data.length > 0 ? response.data.filter((data) => data.status !== false) : []
                setListCate(chks);
                setCallCate(true)

            }
            
        } catch (err) {
            console.error(err)
        }


    }

    requestCate();


 },[callCate])


 useEffect(() => {

    const requestUnit = async () => {

        try {
            const response = await endpoint.get("/sizeproduct")
            //console.log(response)
            if(response.data.code === 1 ){

                const chks = response.data.list.length > 0 ? response.data.list.filter((data) => data.status !== false) : [];
                console.log(chks)
                
                setListUnit(chks)
                setCallUnit(true)
            }
            
        } catch (err) {
            console.error(err)
        }
    }

    requestUnit();

 }, [callUnit])

 useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

 const handleChange = (e , id) => {
        //console.log(id.props.id)
        //setObjSendFrm({...objSendFrm , idCate:id.props.id})
        setCate(e.target.value);
  };
 
  const handleDelete = (id) => {
       //console.log(chipToDelete)
       const filterData = chipData.filter((prd) => prd.id !==  id );

        console.log(filterData);
        setChipData(filterData);

  }
  const addSizePrd = () => {
    
    
    var obj = {id:chipData.length+1 ,unit :unitname , color :colorPrd , total :totalPrd, price  :pricePrd, priceLast :priceLastPrd }

    setChipData([...chipData , obj]);
    setUnitname('');
    setColorPrd('');
    setTotalPrd('');
    setPricePrd('');
    setPriceLastPrd('');

  }

 

  const upLoadImg =  () => {

    if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(async () => {
          
            if(files.length > 0){

                const formData = new FormData()
        
            files.forEach(file =>{
                formData.append("file", file);
              });
           
            const response = await endpoint.post("/uploadproduct" , formData  , {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});
        
            if(response.status === 200 && response.statusText === "OK"){
        
                console.log(response)
                var listimg = [];
                var ids = 1;
                for(var i = 0; i < response.data.length; i++){
        
                    let id = i + ids;
                    listimg.push({id:id , name:response.data[i].filename , folder:"uploadsproduct"});
        
                }
        
                setObjSendFrm({...objSendFrm , imgList:listimg})

                setSuccess(true);
                setLoading(false);
        
             }
        
            }else{
        
                setMsgErr({...msgErr , data:'คุณยังไม่มีการ <strong>เพิ่มรูปสินค้า</strong>'});
                setOpenAlertErr(true);

                setSuccess(false);
                setLoading(false);
                
            }
  
        }, 3500);
      }
  }

  const changeImgDrop = (file) => {

    const fileData = file;
    
    setfiles(fileData)
    setSuccess(false);
    setLoading(false);


  }
  const changeImg =  async (e) => {

    console.log(e.target.files[0])
    const file = e.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onloadend = () => { 

            setImageUrl(reader.result)
           
            //file["namefolder"]  = "cate";
        }

         reader.readAsDataURL(file) 

        
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
                    //setImgData(sp[1])
                    setObjSendFrm({...objSendFrm , imgMain:sp[1]})
                }else{
                    //setImgData(newpath)
                    setObjSendFrm({...objSendFrm , imgMain:newpath})
                }
            }
       }
  }
  const submitPrdAdd = (e) => {

    e.preventDefault();

    if(chipData.length > 0)
    {
       
        objSendFrm["productList"] = chipData;

    }else{

        setOpenAlertErr(true);
        setMsgErr({...msgErr , data:'กรุณาเพิ่ม <strong>สินค้า</strong>'});
        return;

    }
    objSendFrm["prdTitle"] = titlePrd;
    objSendFrm["cate"] = cate;
    objSendFrm["status"] = chkSwitch;
  

    setTimeout(async () => 
    {
     setRefresh(false);
        
    let hasKey = objSendFrm.hasOwnProperty('imgList');

    console.log(objSendFrm)

    if(hasKey){

         try {
            const response = await endpoint.post("/product" , JSON.stringify(objSendFrm) , {headers: {
                'Content-Type': 'application/json'
            }});
            if(response.data.code === 1){

                setObjSendFrm({});
                setImageUrl(null);
                setCate('');
                setTitlePrd('');
                setPrdDes('');
                setUnitname('');
                setColorPrd('');
                setTotalPrd('');
                setPricePrd('');
                setPriceLastPrd('');
                setfiles([]);
                setChipData([]);
                setSuccess(false);
                setLoading(false);
                
 
                setMsgErr({...msgErr , data:'เพิ่มข้อมูลเรียบร้อย'});
                setOpenAlertSucc(true)
                setRefresh(true);

                setTimeout(function() { navicate('/backend/product')}, 2000);


            }
            else{
                setOpenAlertErr(true);
                setMsgErr({...msgErr , data:'ไม่สามารถเพิ่มข้อมูลได้'});
            }
            
        } catch (error) {
             console.log(error)
        }
        

    }else{

        setOpenAlertErr(true);
        setMsgErr({...msgErr , data:'กรุณาอัพโหลดรูป <strong>สินค้า</strong>'});
       

    }
       
    }, 
    
    1000);
  }
  const handleChangeEditor = (content) => 
  {
        console.log(content)
        setPrdDes(content); 
        setObjSendFrm({...objSendFrm , prdDes:content});
  };
  const changeTitle = (e) => {

    setTitlePrd(e.target.value); 
    //console.log(e.target.value)
   
    //setObjSendFrm({...objSendFrm , prdTitle:e.target.value})

  }
  return ( <>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/product"} style={{textDecoration: "none"}}>
                        <Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button>
                    </Link>
                </Grid>
             </Grid>
             <form onSubmit={submitPrdAdd} style={{width:"100%"}}>
             <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                
                <Grid item xs={12} sx={{p:2}}>
                    <FormControl variant="filled" fullWidth>
                            <InputLabel id="cate-select-label">หมวดหมู่สินค้า</InputLabel>
                            <Select
                                labelId="cate-label"
                                id="cate"
                                value={cate}
                                label="หมวดหมู่สินค้า"
                                onChange={handleChange}
                                required
                            >
                            {
                                listCate.length > 0 ?
                                listCate.map((data , index) => {
                                    return (<MenuItem key={index} id={data.id} value={data.catename}>{data.catename}</MenuItem>)
                                })
                                : <MenuItem value={""}>ไม่มีข้อมูล</MenuItem>

                            }
                            
                            </Select>
                    </FormControl>
                </Grid>
                        
                <Grid item xs={12} sx={{p:2}}>
                        <TextField 
                            id="prdtitle" 
                            label="หัวข้อสินค้า" 
                            variant="filled" 
                            value={titlePrd} 
                            onChange={changeTitle} 
                            required
                            fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <EditorContent
                        initialContent={prdDes} 
                        placeholder={"รายละเอียดข่าว"}
                        onChange={handleChangeEditor}
                     />                   
                </Grid>
               
                <Grid item xs={2} sx={{p:2}}>
                    
                        <Autocomplete
                            disablePortal
                            id="unitname"
                            options={listUnit.length > 0 ? listUnit.map((option) => option.unitname) : []}
                            variant="filled"
                            renderInput={(params) => <TextField {...params} variant="filled" label="หน่วย" />}
                            onChange={(e , value) => setUnitname(value.toLowerCase())}
                            onInputChange={(event, newInputValue) => {
                                 setUnitname(newInputValue.toLowerCase());
                                 
                              }}
                            defaultValue={''}
                            inputValue={unitname}
                            value={unitname}
                            />
                    
                </Grid>
                <Grid item xs={2} sx={{p:2}}>
                         <Autocomplete
                                disablePortal
                                id="colorname"
                                options={colors.map((option) => option.colorname)}
                                variant="filled"
                                renderInput={(params) => <TextField {...params} variant="filled" label="สี" />}
                                onChange={(e , value) => setColorPrd(value.toLowerCase())}
                                onInputChange={(event, newInputValue) => {
                                    setColorPrd(newInputValue.toLowerCase());
                                   
                                }}
                                defaultValue={''}
                                inputValue={colorPrd}
                                value={colorPrd}
                                />
                </Grid>
                <Grid item xs={2} sx={{p:2}}>
                    <TextField 
                            id="totalproduct" 
                            label="จำนวนสินค้า (ชิ้น)" 
                            variant="filled" 
                            value={totalPrd}
                            onChange={(e) => setTotalPrd(e.target.value)}
                            fullWidth />
                </Grid>
                <Grid item xs={2} sx={{p:2}}>
                    <TextField 
                            id="priceproduct" 
                            label="ราคาสินค้า" 
                            value={pricePrd}
                            onChange={(e) => setPricePrd(e.target.value)}
                            variant="filled" 
                            fullWidth />
                </Grid>
                <Grid item xs={2} sx={{p:2}}>
                    <TextField 
                        id="priceproductlast" 
                        label="ราคาสินค้าสุทธิ" 
                        variant="filled" 
                        value={priceLastPrd}
                        onChange={(e) => setPriceLastPrd(e.target.value)}
                        fullWidth />
                </Grid>
                 <Grid item xs={2} sx={{p:2}}>
                    <Button variant='contained' sx={{m:1}} color="success" onClick={addSizePrd}><AddIcon /> เพิ่ม</Button>
                </Grid>
                
                <Grid item xs={12} sx={{p:2}}>
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: '#f0f0f0',
                          
                    }}
                    >
                   
                      {
                        chipData.length > 0 ?
                        chipData.map((data ,key) => {
                            //console.log(data)
                          
                            let labels = data.unit +" สี " +data.color +" จำนวน " + data.total + " ราคาก่อนลดราคา " + data.price + " ราคาหลังลดราคา " +data.priceLast;
                           /* if (data.label === 'React') {
                                icon = <TagFacesIcon />;
                            }*/
                            
                            return (<Chip
                                        sx={{m:2}}
                                        key={key}
                                        label={labels}
                                        color="info"
                                        onDelete={() => handleDelete(data.id)}
                                    />
                                     );
                        })
                        :<Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูล</Typography>
                        }  
                     </Box>
                 </Grid>
                 <Grid item xs={12} sx={{p:2}}>
                    <Button
                    variant="contained"
                    component="label"
                    size="small"
                    color="primary"
                    sx={{mt:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                    >
                                <ImageIcon/>
                                <input
                                type="file"
                                onChange={changeImg}
                                required
                                hidden
                                />
                            รูปหน้าปกสินค้า
                    </Button>
                    
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                     {
                        imageUrl ? <img src={imageUrl} alt="img-main-product" /> : <img src={imgdefault} alt="img-blank" />
                     }
                   
                </Grid>
               <Grid item xs={12} sx={{p:2}}>
                     <Typography variant='p'>รูปภาพสินค้าย่อย</Typography>

                     {
                        reFresh ? 
                        <DropzoneArea
                        acceptedFiles={["image/*", "video/*", "application/*"]}
                        onChange={changeImgDrop}
                        showFileNames
                        dropzoneText="Upload"
                        showAlerts={false}
                        filesLimit={20}
                        initialFiles={files}
                        />
                        :null
                     }
                    {/* ตอน edit ให้โหลดรูปทั้งหมดไปใส่ใน BOx แทน แล้วถ้าจะอัพรูปใหม่ หรือแก้ไข ให้ ใช้ state เก็บ file รูปเป็น array แล้วใช้ formdata ส่งเอา */ }
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Fab
                        aria-label="save"
                        color="info"
                        sx={buttonSx}
                        onClick={upLoadImg}
                        >
                        {success ? <CheckIcon /> : <PublishIcon />}
                        </Fab>
                        {loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                            }}
                        />
                        )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                        onClick={upLoadImg}
                        color="info"
                        >
                         ยืนยันอัพโหลด
                        </Button>
                        {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            
                            }}
                        />
                        )}
                    </Box>
                    </Box>
                   
                </Grid>

                <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch  checked={chkSwitch}  onChange={() => setchkSwitch(!chkSwitch) }  />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                
                <Grid item xs={12} sx={{p:1}}>
                        <Button variant='contained' type="submit" sx={{ml:0 , mb:3}}> <CheckIcon /> ยืนยัน</Button>
                        <Button variant='contained' color="error" sx={{ml:2 , mb:3}}><CloseIcon />ยกเลิก</Button>
                </Grid>
             </Grid>
             <DrafDialogDefault open={openAlertErr}  setOpen={setOpenAlertErr} title={"แจ้งเตือน"}>
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                        <div dangerouslySetInnerHTML={{ __html: msgErr.data }} />
                    </Alert>
                    
             </DrafDialogDefault>
             <DrafDialogDefault open={openAlertSucc}  setOpen={setOpenAlertSucc} title={"แจ้งเตือน"}>
                    <Alert severity="success">
                    <AlertTitle>สำเร็จ</AlertTitle>
                        <div dangerouslySetInnerHTML={{ __html: msgErr.data }} />
                    </Alert>
                    
             </DrafDialogDefault>
            </form>
          </>
        )
}

export default FrmAddProduct