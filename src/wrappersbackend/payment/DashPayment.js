import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Typography, Grid  , Stack , Button  , TextField  , InputAdornment , Pagination}  from '@mui/material';
import CardPayment from '../../component/Card/CardPayment';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import endpoint from '../../api/endpoint';

const DashPayment = () => {
  const [statusCallApi , setStatusCallApi]= useState(false);
  const [searchData , setSearchData] = useState('');
  const [listPayment , setListPayment] = useState([]);
  const [prvPayment , setPrvPayment] = useState([]);
  const [pages , setPages] = useState(1);
  const [prvPage , setPrvPage] = useState(1);
  useEffect(()=> {

    const callData = async () => {

        try {
            const response = await endpoint.get("/payment");
            if(response.data.code === 1){

                const reData = response.data.list.map((data , index) => {

                    const indexs = index+1;
                    const sumpageonce = Math.ceil(indexs / 3);
                    data["page"] = sumpageonce;

                    return data;


                })
                const pagesAll = Math.ceil(reData.length / 3);
                setPages(pagesAll)
                setListPayment(reData)
                setPrvPayment(reData)
                setStatusCallApi(true)


            }
            
        } catch (error) {
             console.error(error);
        }


    }
    callData()

  },[statusCallApi])

  const changePage = (e , value) => {

    setPrvPage(value)
  }
  const changeSearch = (e) => {
    var val = e.target.value;
    setSearchData(val);
    var newArr  = [];
    if(val !== ""){

        for(const [key ,value] of Object.entries(prvPayment)){

           
            if(value.id.toString().includes(val)){

                const indexs = parseInt(key)+1
                const pagePer = Math.ceil(indexs / 3);
                value["page"]  = pagePer;
                newArr.push(value);
               

            }else if(value.bankname !== undefined){

                if(value.bankname.includes(val)){

                    const indexs = parseInt(key)+1
                    const pagePer = Math.ceil(indexs / 3);
                    value["page"]  = pagePer;
                    newArr.push(value);
                   
                 }
            }
            else if(value.promptpayname !== undefined){

                if(value.promptpayname.includes(val)){

                    const indexs = parseInt(key)+1
                    const pagePer = Math.ceil(indexs / 3);
                    value["page"]  = pagePer;
                    newArr.push(value);
                  
                 }
            }
        }
         var pageAll = Math.ceil(newArr.length / 3);
         setPages(pageAll);
         setListPayment(newArr)


    }else{

        const pageAll = Math.ceil(prvPayment.length / 3);
        setPages(pageAll);
        setListPayment(prvPayment);


    }


  }

  return (<>
            <Stack spacing={1} sx={{m:1}} direction="row">
                <Typography variant='h6' sx={{color:"#000"}}>ตั้งค่าการชำระเงิน</Typography>
                <Link to={"/backend/payment/add"} style={{textDecoration: "none"}}><Button variant="contained" color="info"><AddIcon /> เพิ่มข้อมูล</Button></Link>
            </Stack>
            <Grid container sx={{m:1}}>
                
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                        label="ค้นหา"
                        id="filled-start-adornment"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                        }}
                        value={searchData}
                        onChange={changeSearch}
                        size="small"
                        variant="filled"
                        fullWidth
                        />
                    </Grid>
            </Grid>
            <Grid container spacing={2}>
                {
                    statusCallApi ? 
                        listPayment.length > 0 ?
                            listPayment.map((data , index) => {
                                return (data.page === prvPage) ? 
                                            <Grid key={index} item xs={12} sm={12} md={12} lg={4}>
                                                <CardPayment data={data} setStatusCallApi={setStatusCallApi} />
                                            </Grid>
                                            :<Grid item xs={12} sm={12} md={12} lg={12} sx={{m:1}}>
                                                <Typography >ไม่มีข้อมูล</Typography>
                                            </Grid>
                                
                                })
                                
                        
                        : <Grid item xs={12} sm={12} md={12} lg={12} sx={{m:1}}>
                            <Typography>ไม่มีข้อมูล</Typography>
                        </Grid>
                    :
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{m:1}}>
                        <Typography>กรุณารอสักครู่ .....</Typography>
                    </Grid>
                }
            </Grid>
            <Stack spacing={2} sx={{mt:1}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </>
    )
}

export default DashPayment