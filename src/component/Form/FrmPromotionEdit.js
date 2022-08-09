import React , {useState , useEffect , useRef} from 'react';
import { Link , useParams , useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid , Button , TextField , FormGroup , FormControlLabel 
    , Switch , Box  , Chip , Typography , InputLabel 
     , InputAdornment , List , ListItem , ListItemButton
    , ListItemText , ListItemAvatar , Checkbox , Avatar , Alert  ,AlertTitle
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import endpoint from '../../api/endpoint';
import SearchIcon from '@mui/icons-material/Search';

const FrmPromotionEdit = () => {

 let {id} = useParams();
 let myRef = useRef();
 let navicate = useNavigate();
 const addZero = (date) => {
        let data;
        if(date < 10){
             data = "0"+date;
        }else{
            data = date;
        }
        return data;
  }
  var dates = new Date();
  var year  = dates.getFullYear();
  var months = addZero(parseInt(dates.getMonth())+1);
  var days =   addZero(dates.getDate());
  var current_date = year+"-"+months+"-"+days;

  const [sDate, setsDate] = useState(new Date(current_date));
  const [eDate, seteDate] = useState(new Date(current_date));
  const [title , setTitle] = useState('');
  const [desPro , setDesPro] = useState('');
  const [listProduct , setListProduct] = useState([]);
  const [prvList , setPrvList] = useState([]);
  const [callProduct , setCallProduct] = useState(false);
  const [callPromotion , setCallPromotion] = useState(false);
  const [searchData , setSearchData] = useState('');
  const [checked, setChecked] = useState([]);
  const [chipData, setChipData] = useState([]);
  const [statusChk , setStatusChk] = useState(true);
  const [alertStatus , setAlertStatus] = useState(false);
  const [alertMsg , setAlertMsg] = useState({status:"error" , text:""});

  useEffect(() => {

    const reqProduct = async () => {

        try {
            const response = await endpoint.get("/product");
            if(response.data.code === 1){

                setListProduct(response.data.list);
                setPrvList(response.data.list)
                setCallProduct(true)


            }
            
        } catch (error) {
            console.error(error)
        }

    } 
    reqProduct();

  },[callProduct])

  useEffect(()=> {

    const getData = async () => {

        try {
            const response = await endpoint.patch(`/promotion/${id}`);
            if(response.data.code === 1){

                //setPromoPer(response.data.list)
                setTitle(response.data.list.title);
                setDesPro(response.data.list.detailpro);
                setsDate(response.data.list.sdate);
                seteDate(response.data.list.edate)
                setChecked(response.data.list.chooseprd);
                setStatusChk(response.data.list.status)
                setCallPromotion(true)
            }
            
        } catch (error) {
            console.error(error);
        }

    }
    getData();

  },[callPromotion , id])

 
 useEffect(()=> {

    var listarr = [];

    if(listProduct.length > 0){


        for(var i = 0 ; i < listProduct.length; i++)
        {
            if(checked.indexOf(listProduct[i].id) > -1){
                
                listarr.push(listProduct[i]);
            }
        }
        
        setChipData(listarr);
       // console.log(listarr)

    }
    

 },[checked , listProduct])

  const handleChangeSDate = (newValue) => {
        setsDate(newValue);
  };
  const handleChangeEDate = (newValue) => {
        seteDate(newValue);
  };

 const filterDataPrd = (data) => {

    var newArr = [];

    for(var i = 0 ; i < listProduct.length; i++){

        if(data.indexOf(listProduct[i].id) !== -1){

            newArr.push(listProduct[i]);
            
         }

    }
   
    setChipData(newArr);
   }
   const handleDelete = (chipToDelete) => {
    //console.log(chipToDelete)
    const filterData = chipData.filter((prd) => prd.id !==  chipToDelete.id );
     if(checked.indexOf(chipToDelete.id) !== -1){

        const newChecked = [...checked];
        const currentIndex = checked.indexOf(chipToDelete.id);
        newChecked.splice(currentIndex, 1);
        setChecked(newChecked);

     }
     setChipData(filterData);
}

const handleToggle = (value) => () => {
      
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    //console.log(newChecked)
    filterDataPrd(newChecked)
    setChecked(newChecked);
  };
  
  const searchPrd = (e) => {
    var vals = e.target.value;
    setSearchData(vals);
    var newArr = [];
    if(vals !== ""){

        for(var i = 0; i < prvList.length; i++){

            if(prvList[i].prdTitle.includes(vals)){
                   newArr.push(prvList[i]);
            }
        }
      
        setListProduct(newArr)
   }else{
        setListProduct(prvList)
    }

  }
  const frmEditSubmit = async (e) => {
    e.preventDefault();
    if(title && desPro){

        if(chipData.length > 0){

            let obj = {id:id , title ,detailpro:desPro , sdate :sDate , edate: eDate , status:statusChk , chooseprd:checked};
            //console.log(obj)
            try {

                const response = await endpoint.put("/promotion" , JSON.stringify(obj) , {headers : {'Content-Type': 'application/json'}});
                if(response.data.code === 1){

                    window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
                    setAlertMsg({...alertMsg , status:"success"  , text:"กรุณาเลือกสินค้าที่ร่วมรายการ"})
                    setAlertStatus(true);
                    setTimeout(function() {setAlertStatus(false)}, 3000);
                    setTimeout(function() {navicate("/backend/promotion")}, 3500);
                     
                }

                
            } catch (error) {
                console.error(error);
            }


        }else{

            window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
            setAlertMsg({...alertMsg , text:"กรุณาเลือกสินค้าที่ร่วมรายการ" })
            setAlertStatus(true);
            setTimeout(function() {setAlertStatus(false)}, 3000);

        }

    }else{

        window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
        setAlertMsg({...alertMsg , text:"กรุณากรอกข้อมูลให้ครบถ้วน" })
        setAlertStatus(true);
        setTimeout(function() {setAlertStatus(false)}, 3000);

    }

  } 
  return (<> 
             <div ref={myRef}></div>
             <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/promotion"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            {
                alertStatus ? 
                <Alert severity={alertMsg.status} sx={{width:"100%"}}>
                <AlertTitle>แจ้งเตือน</AlertTitle>
                            {alertMsg.text}
                </Alert>
                :null
            }
            <form onSubmit={frmEditSubmit} style={{width:"97%"}}>
            <Grid container spacing={2} sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                <Grid item xs={12} sx={{p:2}}>
                        <TextField id="filled-basic" label="ชื่อโปรโมชั่น" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <TextField 
                        id="detailpro"
                        multiline
                        rows={3}
                        label="รายละเอียดโปรโมชั่น" 
                        variant="filled" 
                        value={desPro}
                        onChange={(e) => setDesPro(e.target.value)}
                        fullWidth />
                </Grid>
                <Grid item xs={6} sx={{p:2}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="วันที่เริ่มใช้"
                                inputFormat="MM/dd/yyyy"
                                value={sDate}
                                onChange={handleChangeSDate}
                                renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
                            />
                        </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{p:2}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="วันที่หมดอายุ"
                                inputFormat="MM/dd/yyyy"
                                value={eDate}
                                onChange={handleChangeEDate}
                                renderInput={(params) => <TextField {...params} variant="filled" fullWidth />}
                            />
                        </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                <InputLabel htmlFor="my-input" sx={{color:"#000" ,pb:0.5}}>เลือกสินค้าที่ร่วมรายการ</InputLabel>
                <TextField 
                    id="filled-basic" 
                    label="ค้นหา" 
                    variant="filled" 
                    sx={{pb:1}} 
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                    }}
                    value={searchData}
                    onChange={searchPrd}
                    fullWidth />
                <Box sx={{
                    width:"100%",
                    height:200,
                    backgroundColor:"#f0f0f0"
                   ,overflow:"auto"
                    ,'&::-webkit-scrollbar': {
                        width: '0.3em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.1)',
                        outline: '0px solid slategrey'
                    }
                    }}>
                    <List dense sx={{ width: '100%', maxWidth: 360}}>
                    {
                                listProduct.length > 0 ?
                                listProduct.map((value , index) => {
                                const labelId = `checkbox-list-secondary-label-${value.id}`;
                                return (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(value.id)}
                                        checked={checked.indexOf(value.id) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${value.id}`}
                                            src={`http://localhost:7000/${value.imgMain}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${value.prdTitle}`} />
                                    </ListItemButton>
                                </ListItem>
                                );
                            })
                            : <Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูล</Typography>
                            }
                    </List>

                </Box>
                    
               
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <Typography>สินค้าร่วมรายการ</Typography>
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: '#f0f0f0',
                        
                    }}
                    >
                
                    {   chipData.length > 0 ?
                            chipData.map((data ,index) => {

                            return checked.indexOf(data.id) >-1 ? 
                                    (<Chip
                                        sx={{m:2}}
                                        key={index}
                                        label={data.prdTitle}
                                        color="info"
                                        onDelete={() => handleDelete(data)}
                                    />
                                    )
                                    :null
                                
                         })
                            :<Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูล</Typography>
                        
                        }  
                
                        
                    </Box>

                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={statusChk} onChange={() => setStatusChk(!statusChk) } />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                        <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
            </Grid>
            </form>
        </>
  )
}

export default FrmPromotionEdit