import React , {useState , useRef , useEffect} from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { green } from '@mui/material/colors';
import { Autocomplete ,Box , Grid  , TextField 
    , InputLabel , MenuItem , FormControl 
    , Select , Typography , Chip , CircularProgress
    , Alert , AlertTitle ,Button , Fab , IconButton , FormGroup , FormControlLabel , Switch
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DrafDialogDefault from '../Dialog/DrafDialogDefault';
import PublishIcon from '@mui/icons-material/Publish';
import ImageIcon from '@mui/icons-material/Image';
import imgdefault from "../../assets/noimg.jpg";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditorContent from '../Editor/EditorContent';
import endpoint from '../../api/endpoint';
import colors from '../../data/color.json'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const FrmEditProduct = () => {

    let {id} = useParams();
    let navicate = useNavigate();
    const [listCate , setListCate] = useState([]);
    const [listUnit , setListUnit] = useState([]);
    const [callCate , setCallCate] = useState(false);
    const [callUnit , setCallUnit] = useState(false);
    const [callPerProduct , setCallPerProduct] = useState(false);
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
    const [imgData , setImgData] = useState('');
    const [chkSwitch , setchkSwitch] = useState(true); 
    
    const timer = useRef();
    const buttonSx = {
       ...(success && {
         bgcolor: green[500],
         '&:hover': {
           bgcolor: green[700],
         },
       }),
     };
     const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
         
        },
      }));
     
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

     useEffect(()=> {

        const fetchData = async () => {

            try {
                const response = await endpoint.patch(`/product/${id}`);
                if(response.data.code === 1){
                    console.log(response.data)
                    var arrs = [];
                    var newFile = [];
                    setImageUrl("http://localhost:7000/"+response.data.list.imgMain);
                    setCate(response.data.list.cate);
                    setTitlePrd(response.data.list.prdTitle);
                    setPrdDes(response.data.list.prdDes);
                    setchkSwitch(response.data.list.status);
                    setUnitname('');
                    setColorPrd('');
                    setTotalPrd('');
                    setPricePrd('');
                    setPriceLastPrd('');
                    setImgData(response.data.list.imgMain)
                   
                    if(response.data.list.productList.length > 0){

                     for(var i =0; i < response.data.list.productList.length; i++)
                     {
                        let obj = {id:response.data.list.productList[i].id ,unit :response.data.list.productList[i].unit 
                            , color :response.data.list.productList[i].color , total :response.data.list.productList[i].total 
                            , price  :response.data.list.productList[i].price
                            , priceLast :response.data.list.productList[i].priceLast}  

                       
                        // console.log(obj)   
                         arrs.push(obj)
                       
                     }
                     

                    }else{
                        arrs = [];
                    }

                    setChipData(arrs);

                    if(response.data.list.imgList.length > 0){

                        for(var j = 0; j < response.data.list.imgList.length; j++)
                        {
                            newFile.push({id:response.data.list.imgList[j].id,name:"http://localhost:7000/"+response.data.list.imgList[j].folder+"/"+response.data.list.imgList[j].name , status:"complete"})
                        }

                        
                    }else{
                        newFile = [];
                    }
                    //console.log(newFile);

                    setfiles(newFile);
                    
                    setCallPerProduct(true);
                    

                }
                
            } catch (error) {
                console.error(error)
            }

        }

        fetchData();

     },[callPerProduct , id])

useEffect(() => {
    return () => {
        clearTimeout(timer.current);
    };
}, []);

const handleChange = (e , id) => {
    //console.log(id.props.id)
    setObjSendFrm({...objSendFrm , idCate:id.props.id})
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

            console.log(files)
        
            files.forEach(file => {

                if(file.status === "simulator"){

                    formData.append("file", file.filedata);

                }
                

              });
           
            const response = await endpoint.post("/uploadproduct" , formData  , {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});
        
            if(response.status === 200 && response.statusText === "OK"){
        
                console.log(response)
               
                const fileUp = files.filter((item) => item.status === "complete");

                var ids = fileUp[fileUp.length-1].id;

                var next = 1;

                for(var i = 0; i < response.data.length; i++){
        
                   let newid = ids+next;
                   fileUp.push({id:newid , name:"http://localhost:7000/uploadsproduct/"+response.data[i].filename , status:"complete"});
                   next++;
        
                }

                setfiles(fileUp)
                //setObjSendFrm({...objSendFrm , imgList:listimg})
                
                setSuccess(true);
                setLoading(false);
        
             }
        
            }
            // files.length 
            else{
        
                setMsgErr({...msgErr , data:'คุณยังไม่มีการ <strong>เพิ่มรูปสินค้า</strong>'});
                setOpenAlertErr(true);

                setSuccess(false);
                setLoading(false);
                
            }
  
        }, 3500);
      }
  }
 
  const changeImg =  async (e) => {

    //console.log(e.target.files[0])
    const file = e.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onloadend = () => { 

            //setImageUrl(reader.result)
           
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
                    setImgData(sp[1])
                    setObjSendFrm({...objSendFrm , imgMain:sp[1]})
                }else{
                    setImgData(newpath)
                    setObjSendFrm({...objSendFrm , imgMain:newpath})
                }
            }
       }
  }
  const uploadImgAdd = (e) => {

     //console.log(e.target.files[0])
     const file = e.target.files[0];

     if(file){
 
         const reader = new FileReader();
 
         reader.onloadend = () => { 
 
            let newOb = {id : files.length > 0 ? files[files.length-1].id+1 : 1  , name:reader.result , status:"simulator"  , filedata:file}

            setfiles([...files , newOb])
         }
 
          reader.readAsDataURL(file) 
        }

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

  const submitPrdEdit = (e) => {
    e.preventDefault();

    var refile = [];
    for(var i= 0 ; i < files.length; i++){

        if(files[i].name.indexOf("uploadsproduct") > -1){

                var spfolder = files[i].name.split("/");
                files[i]["folder"] = spfolder[3];
                files[i]["name"]  = spfolder[4];
                refile.push(files[i]);

        }

    }
    objSendFrm["id"] = id;
    objSendFrm["cate"] = cate;
    objSendFrm["prdTitle"] = titlePrd;
    objSendFrm["prdDes"] = prdDes;
    objSendFrm["productList"] = chipData;
    objSendFrm["imgMain"] = imgData;
    objSendFrm["imgList"] = refile;
    objSendFrm["status"] = chkSwitch;
    
  
    setTimeout( async () => 
    {
       
        try {
            const response = await endpoint.put("/product" , objSendFrm);
             if(response.data.code === 1){
                setMsgErr({...msgErr , data:'<strong>แก้ไขข้อมูลเรียบร้อย</strong>'});
                setOpenAlertSucc(true);
                setTimeout(function() 
                {
                    navicate('/backend/product');
                }
                , 2000);

                
             }
            console.log(response)
            
        } catch (error) {
            console.error(error)
        }


    }, 2000);
    console.log(objSendFrm)
    


  }
  const delImg = (id) => {

    //console.log(files)
    const ids  = files.filter((file) => file.id !== id);
    setfiles(ids);
    setSuccess(false);
    setLoading(false);
    //console.log(ids);
  }

 return ( <>
                <Grid container sx={{m:1}}>
                    <Grid item xs={4}>
                        <Link to={"/backend/product"} style={{textDecoration: "none"}}>
                            <Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button>
                        </Link>
                    </Grid>
                </Grid>
                <form onSubmit={submitPrdEdit} style={{width:"100%"}}>
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
                             <Box component="div" sx={{ p: 2, border: '2px dashed #0000001f' , width:"98%" }}>
                                <Grid container spacing={2}>
                                {
                                    files.length > 0 ? files.map((file , index) => {
                                        //console.log(file)
                                        return ( <Grid key={index} item xs={3}> 
                                                    <img src={file.name} alt={index} style={{width:"50%" , margin:2}} />
                                                    <br/>
                                                    
                                                    <IconButton aria-label="del img" onClick={() => delImg(file.id)}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                    <BorderLinearProgress variant="determinate" value={file.status === "complete" ? 100 : 10 } sx={{width:"50%"}} color={file.status === "complete" ? "success" : "warning" } /> 
                                                 </Grid>
                                                )
                                    })
                                     
                                    :<Typography variant='p' sx={{p:1}}>ไม่มีข้อมูล</Typography>
                                 }
                               </Grid>
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
                                                onChange={uploadImgAdd}
                                                hidden
                                                />
                                            อัพโหลดรูปเพิ่ม ....
                                </Button>
                             </Box>
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

export default FrmEditProduct