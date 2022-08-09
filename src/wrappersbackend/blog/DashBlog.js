import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Typography, Grid  , Stack , Button  , TextField  , InputAdornment , Pagination}  from '@mui/material';
import CardBlog from '../../component/Card/CardBlog';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import endpoint from '../../api/endpoint';

const DashBlog = () => {
    const [statusCallApi , setStatusCallApi] = useState(false);
    const [listCate , setListCate] = useState([]);
    const [listTags , setlistTags] = useState([]);
    const [listBlogs , setListBlogs] = useState([]);
    const [prvListBlog , setPrvListBlog] = useState([]);
    const [pages , setPages] = useState(1);
    const [nextPage , setNextPage] = useState(1);
    const [searchData , setSearchData] = useState('');

    useEffect(() => {

        const getAllData = async() => {
  
              const response = await Promise.all([endpoint.get("/tags") , endpoint.get("/blogs") , endpoint.get("/getCategory")]);
              
              if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
  
                    setlistTags(response[0].data.list);
                   
                    setListCate(response[2].data);
  
                    const ReData = response[1].data.list.map((data , index) => {
  
                          const pos = index+1;
                          const page = Math.ceil(pos / 6);
                          data["page"] = page;
                          return data;
              
                    })
  
                    const pageAll = Math.ceil(ReData.length / 6);
                    setPages(pageAll);
                    setListBlogs(ReData);
                    setPrvListBlog(ReData)
                    setStatusCallApi(true);
  
              }
        }
  
        getAllData();
     },[statusCallApi])

     const searchBlog = (e) => {
    
        var vals = e.target.value;
        setSearchData(vals);
        
        var arrs = [];
         if(vals !== ""){
  
  
            for(var i = 0; i < prvListBlog.length; i++){
  
                    if(prvListBlog[i].title.includes(vals)){
                         
                          const pos = i+1;
                          const page = Math.ceil(pos / 6);
                          prvListBlog[i]["page"] = page;
                          arrs.push(prvListBlog[i]);
                     }
  
              }
              //console.log(arrs)
              const pageAll = Math.ceil(arrs.length / 6);
              setPages(pageAll);
              setListBlogs(arrs)
            
  
        }else{
  
              const pageAll = Math.ceil(prvListBlog.length / 6);
              setPages(pageAll);
              setListBlogs(prvListBlog);
        }
  
     }
    const changePage = (e , value) => {
  
          setNextPage(value)
    }

  return (<>
            <Stack spacing={1} sx={{m:1.5}} direction="row">
                <Typography variant='h6' sx={{color:"#000"}}>รายละเอียดข่าว</Typography>
                <Link to={"/backend/blog/add"} style={{textDecoration: "none"}}><Button variant="contained" color="info"><AddIcon /> เพิ่มข่าว</Button></Link>
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
                        onChange={searchBlog}
                        fullWidth
                        />
                    </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{p:1}}>
                
                {
                
                listBlogs.length > 0 ?
                listBlogs.map((val , index) => {

                        var catename = listCate.find((item) => item.id === val.cateid);
                        
                        return (val["page"] === nextPage) ? <CardBlog key={index} blogs={val} tags={listTags} category={catename} setStatusCallApi={setStatusCallApi}/> : null

                        })
                        : <Typography>ไม่มีข้อมูล ...</Typography>
                }
            </Grid>
            <Stack spacing={2} sx={{mt:1}} alignItems="center">
                <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </>
    )
}

export default DashBlog