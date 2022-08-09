import React , {useState  , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Typography, Grid  , Stack , Button  , TextField  , InputAdornment , Pagination}  from '@mui/material';
import CardCoupon from '../../component/Card/CardCoupon';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import endpoint from '../../api/endpoint';

const DashCoupon = () => {
    const [statusCallApi , setStatusCallApi] = useState(false);
    const [searchData , setSearchData] = useState('');
    const [listCoupon , setListCoupon] = useState([]);
    const [prvCoupon , setPrvCoupon] = useState([]);
    const [pages , setPages] = useState(1);
    const [prvPage , setPrvPage] = useState(1);

    useEffect(() => {

        const callData = async () => {
    
            try {
                const response = await endpoint.get("/coupon");
                if(response.data.code === 1){
    
                    const reData = response.data.list.map((data , index) => {
    
                        var indexs = index+1;
                        var pagePer = Math.ceil(indexs / 6);
                        data["page"] = pagePer;
                        return data;
                     })
    
                     const pageAll = Math.ceil(reData.length / 6);
                     setPages(pageAll);
                     setListCoupon(reData)
                     setPrvCoupon(reData)
                     setStatusCallApi(true)
    
                }
                
            } catch (error) {
                console.error(error)
            }
    
        }
        callData();
    
      },[statusCallApi])

    const changePage = (e , value) => {
         //console.log(value);
        setPrvPage(value)
    }
    const changeSearch = (e) => {
        var val = e.target.value;
        setSearchData(val)
        var newArr = [];
        if(val !== ""){
        
            for(const [key , value] of Object.entries(prvCoupon)){
    
                if(value.id.toString().includes(val) || value.namecoupon.includes(val) || value.codecoupon.includes(val)){
    
                    const pos = parseInt(key) + 1;
                    const page  = Math.ceil(pos / 6);
                    value["page"] = page;
                    newArr.push(value);
    
                }
            }
            //console.log(newArr);
            const pageAll = Math.ceil(newArr.length / 6);
            setPages(pageAll);
            setListCoupon(newArr);
    
        }else{
    
            const pageAll = Math.ceil(prvCoupon.length / 6);
            setPages(pageAll);
            setListCoupon(prvCoupon);
    
        }
    
        
      }

  return (<>
                <Stack spacing={1} sx={{m:1}} direction="row">
                    <Typography variant='h6' sx={{color:"#000"}}>รายละเอียดคูปอง</Typography>
                    <Link to={"/backend/coupon/add"} style={{textDecoration: "none"}}><Button variant="contained" color="info"><AddIcon /> เพิ่มข้อมูล</Button></Link>
                </Stack>
                <Grid container sx={{m:1}}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                            label="ค้นหา"
                            id="searchcoupon"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                            }}
                            size="small"
                            variant="filled"
                            value={searchData}
                            onChange={changeSearch}
                            fullWidth
                            />
                        </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {
                        statusCallApi ?
                            listCoupon.length > 0 ? 
                                listCoupon.map((data , index) => {
                                    return (data.page === prvPage) ?
                                                <Grid key={index} item xs={12} sm={12} md={12} lg={4}>
                                                    <CardCoupon data={data} setStatusCallApi={setStatusCallApi}  />
                                                </Grid>
                                                :<Grid key={index} item xs={12} sm={12} md={12} lg={4} sx={{m:1}}>
                                                    <Typography>ไม่มีข้อมูล</Typography>
                                                </Grid>
                                        
                                })
                                
                                :<Grid item xs={12} sm={12} md={12} lg={12} sx={{m:1}}>
                                    <Typography>ไม่มีข้อมูล</Typography>
                                </Grid>
                        
                        :<Grid item xs={12} sm={12} md={12} lg={12} sx={{m:1}}>
                            <Typography>กรุณารอสักครู่ ....</Typography>
                        </Grid>
                    }
                
                
                </Grid>
                <Stack spacing={2} sx={{mt:1}} alignItems="center">
                        <Pagination count={pages} color="primary" onChange={changePage} />
                </Stack>
            </>
    )
}

export default DashCoupon