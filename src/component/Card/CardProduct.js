import React , {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import DrafCard from './DrafCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import endpoint from '../../api/endpoint';
import { useState } from 'react';
const CardProduct = () => {

  const [statusCallApi , setStatusCallApi]= useState(true);
  const [listProduct , setListProduct] = useState([]);
  const [prvListProduct , setPrvListProduct] = useState([]);
  const [dataSuccess , setDataSuccess] = useState(false);
  const [pages , setPages] = useState(1);
  const [searchData , setSearchData] = useState('');
  const [nextPage , setNextPage] = useState(1);
  

  useEffect(() => {

    const callProduct = async () => {

      try {
          const response = await endpoint.get("/product")
          if(response.data.code === 1){
            console.log(response.data.list)
            
            const reData = response.data.list.map((data , index) => {

                const indexs = index + 1;
                const pageAll = Math.ceil(indexs / 6);
                data["page"] = pageAll;

                return data;

            })

             const pageAll = Math.ceil(reData.length / 6);
             setPages(pageAll)
             setListProduct(reData);
             setPrvListProduct(reData)
             setStatusCallApi(true);
             setDataSuccess(true)
          }

        } catch (error) {
            console.error(error);
        }


    }

    callProduct();



  },[statusCallApi])
 
  const changePage = (e , value) => {

        setNextPage(value)
      

  }
  const locateAdd = () => {

    window.location = "/backend/product/add"
  }
  const searchVal = (e) => {

    var vals = e.target.value;
    setSearchData(vals);
    var newArr = [];
    //setDataSuccess(false);

    if(vals !== ""){

        for(const [key , value] of Object.entries(prvListProduct)){

          if(value.id.toString().includes(vals) || value.prdTitle.includes(vals)){

              const pos = parseInt(key) + 1;
              const page = Math.ceil(pos / 6);
              value["page"] = page;
              newArr.push(value);

          }

        }
        const pagesAll = Math.ceil(newArr.length / 6);
        setPages(pagesAll);
        setListProduct(newArr);
        //setDataSuccess(true);
        

    }else{

      const pagesAll = Math.ceil(prvListProduct.length / 6);
      setPages(pagesAll);
      setListProduct(prvListProduct);
     // setDataSuccess(true);

    }

  }

  return (<Box
          sx={{
            m:1,
            p:1,
            width: "99%",
            backgroundColor: 'transparent',
           
            }}
            >
            <Grid container spacing={2} >
                    <Grid item xs={12} sm={11} sx={{mt:1 , mb:2}}>
                        <TextField
                          label="ค้นหา"
                          id="filled-start-adornment"
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                          }}
                          size="small"
                          variant="filled"
                          value={searchData}
                          onChange={searchVal}
                          fullWidth
                          />
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{mt:1 , mb:2}}>
                        <Button variant="contained" color="info" sx={{height:48}} onClick={locateAdd}><AddIcon/>เพิ่ม</Button>
                    </Grid>
            </Grid>
            <Grid container spacing={2}>
               
                {
                  dataSuccess ? 
                    listProduct.length > 0 ? 
                      listProduct.map((data , index) => {
                        return data["page"] === nextPage ? <Grid key={index} item xs={4}><DrafCard  data={data} setStatusCallApi={setStatusCallApi}  /></Grid> : null
                       })
                      :<Grid key={0} item xs={12}>ไม่มีข้อมูล</Grid>
                  :<Grid key={0} item xs={12}>กรุณารอสักครู่ ......</Grid>
                }
               
            </Grid>
            <Stack spacing={2} sx={{mt:3}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>

          </Box>
  )
}

export default CardProduct