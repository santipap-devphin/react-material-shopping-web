import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Typography, Grid  , Stack , Button  , TextField  , InputAdornment , Pagination}  from '@mui/material';
import BoxPromotion from '../../component/Box/BoxPromotion';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import endpoint from '../../api/endpoint';

const DashPromotion = () => {
    const [callProduct , setCallProduct] = useState(false);
    const [statusCallApi , setStatusCallApi] = useState(false);
    const [listPromo , setListPromo] = useState([]);
    const [listProduct , setListProduct] = useState([]);
    const [prvPro , setPrvPro] = useState([]);
    const [nextPage , setNextPage] = useState(1);
    const [pages , setPages]= useState(1);
    const [searchData , setSearchData] = useState('');
    useEffect(() => {

        const fetchData = async () => {

            const response = await endpoint.get("/promotion");
           
            if(response.data.code === 1){

                var reData = response.data.list.map((val , key) => {

                        const pos = key+1;
                        const page = Math.ceil(pos / 6);
                        val["page"] = page;

                        return val;

                })

                //console.log(reData)
                const pageAll = Math.ceil(reData.length / 6);

                setPages(pageAll)
                setListPromo(reData)
                setPrvPro(reData)
                setStatusCallApi(true);
                //setListPromo(response.data)


            }

        }

        fetchData();

    },[statusCallApi])
    useEffect(() => {

        const reqPro = async () => {

            try {
                const response = await endpoint.get("/product");
                if(response.data.code === 1){

                    setListProduct(response.data.list);
                    setCallProduct(true);
                }
                
            } catch (error) {
                console.error(error);
            }
        }
        reqPro();

    },[callProduct])
    const changePage = (e , value) => {
        setNextPage(value);
    }
    const changeSearch = (e) => {
        var vals = e.target.value;
        setSearchData(vals);
        var newArr = [];
    
        if(vals !== ""){
    
            for(const [key , value] of Object.entries(prvPro)){
    
                    if(value.title.includes(vals)){
    
                        const pos = parseInt(key)+1;
                        const page = Math.ceil(pos / 6);
                        value["page"] = page;
                        newArr.push(value);
    
                    }
            }
            const pageAll = Math.ceil(newArr.length  / 6);
            setPages(pageAll);
            setListPromo(newArr)
    
    
        }else{
            const pageAll = Math.ceil(prvPro.length  / 6);
            setPages(pageAll);
            setListPromo(prvPro)
        }
    
      }

  return (<>
            <Stack spacing={1} sx={{m:2}} direction="row">
                <Typography variant='h6' sx={{color:"#000"}}>รายละเอียดโปรโมชั่น</Typography>
                <Link to={"/backend/promotion/add"} style={{textDecoration: "none"}}><Button variant="contained" color="info"><AddIcon /> เพิ่มข้อมูล</Button></Link>
            </Stack>
            <Grid container sx={{m:2}}>
                
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                        label="ค้นหา"
                        id="searchdata"
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
            <Grid container sx={{m:1}}>
                {
                    statusCallApi ? 
                        listPromo.length > 0 ?
                        listPromo.map((val ,keys) => {
                                return val.page === nextPage ? <BoxPromotion key={keys} promo={val} product={listProduct} setStatusCallApi={setStatusCallApi} /> : null
                        })
                        : <Grid item xs={12}><Typography variant='p' sx={{p:1}}>ไม่มีข้อมูล</Typography></Grid>
                    :<Grid item xs={12}><Typography variant='p' sx={{p:1}}>กรุณารอสักครู่ ....</Typography></Grid>
                }
                
                </Grid>
                <Stack spacing={2} sx={{mt:1}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </>
  )
}

export default DashPromotion