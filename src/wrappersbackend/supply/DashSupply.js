import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Typography, Grid  , Stack , Button  , TextField  , InputAdornment , Pagination}  from '@mui/material';
import CardSupply from '../../component/Card/CardSupply';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import endpoint from '../../api/endpoint';

const DashSupply = () => {
    const [prvNext , setPrvNext] = useState(1);
    const [searchData , setSearchData] = useState(''); 
    const [statusCallApi , setStatusCallApi]= useState(false);
    const [listSupply , setListSupply] = useState([]);
    const [prvSupply   , setPrvSupply] = useState([]);
    const [pages , setPages] = useState(1);

    useEffect(() => {

        const callData = async() => {

            const response  = await endpoint.get("/supply");
            if(response.data.code === 1){

                const reData = response.data.list.map((data , index) => {

                    const indexs = index+1;
                    const page =  Math.ceil(indexs / 6);
                    data["page"] = page;

                    return data;


                })
                
                const pageAll = Math.ceil(reData.length / 6);
                setPages(pageAll);
                setListSupply(reData)
                setPrvSupply(reData)
                setStatusCallApi(true)

            }

        }

        callData();

    },[statusCallApi])

   const changePage = (e , value) => {

        setPrvNext(value);
        

  }
  const searchSupply = (e) => {

    var val = e.target.value;
    setSearchData(val);
    var newArr = [];
    if(val !== ""){

        for(const [key , value] of Object.entries(prvSupply)){

             if(value.id.toString().includes(val) ||  value.supplyname.toLowerCase().includes(val) || value.supplycode.toLowerCase().includes(val) || value.supplyprice.toLowerCase().includes(val)){

                const pos = parseInt(key)+1;
                const page = Math.ceil(pos / 6);
                value["page"] = page;
                newArr.push(value)
             }

        }
        const pageAll = Math.ceil(newArr.length / 6);
        setPages(pageAll)
        setListSupply(newArr);

    }else{

        const pageAll = Math.ceil(prvSupply.length / 6);
        setPages(pageAll);
        setListSupply([...prvSupply]);

    }
  }

  return (<>
            <Stack spacing={1} sx={{m:1}} direction="row">
                <Typography variant='h6' sx={{color:"#000"}}>รายละเอียดการจัดส่ง</Typography>
                <Link to={"/backend/supply/add"} style={{textDecoration: "none"}}><Button variant="contained" color="info"><AddIcon /> เพิ่มข้อมูล</Button></Link>
            </Stack>
            <Grid container sx={{m:1}}>
                
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                        label="ค้นหา"
                        id="filled-start-adornment"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                        }}
                        size="small"
                        variant="filled"
                        value={searchData}
                        onChange={searchSupply}
                        fullWidth
                        />
                    </Grid>
            </Grid>
            <Grid container spacing={2}>

                {
                    statusCallApi ? 
                        listSupply.length > 0 ?
                            listSupply.map((data , index) => {
                            return data.page === prvNext ?
                                    <Grid key={index} item xs={12} sm={12} md={12} lg={4}>
                                        <CardSupply data={data} setStatusCallApi={setStatusCallApi} />
                                    </Grid>
                                    :null
                                })
                        : <Grid  item xs={12} sm={12} md={12} lg={12}>
                                <Typography sx={{p:2}}>ไม่มีข้อมูล</Typography>
                        </Grid>
                    : "กรุณารอสักครู่"
                }
            
            
            
            </Grid>
            <Stack spacing={2} sx={{mt:1}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </>
    )
}

export default DashSupply