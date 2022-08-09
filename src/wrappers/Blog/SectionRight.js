import  React , {useState,useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CardMainBlog from '../../component/Card/CardMainBlog';
import endpoint from '../../api/endpoint';

const SectionRight = ({searchData}) => {
   
    const [listBlog , setListBlog] = useState([]);
    const [listCate , setListCate] = useState([]);
    const [listTag , setListTag] = useState([]);
    const [prvListBlog , setPrvListBlog] = useState([]);
    const [loadSucc , setLoadSucc] = useState(false);
    const [pageAll , setPageAll] = useState(1);
    const [nextPage , setNextPage] = useState(1);

    useEffect(() => {

        let callSuccess = true;

        const callData = async() => {

            try {
                const response  = await Promise.all([endpoint.get("/blogs") , endpoint.get("/getcategory") , endpoint.get("/tags")])
                //console.log(response)
                if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
                   
                    for(var i = 0; i < response[0].data.list.length; i++){

                        const pos = i+1;
                        const page = Math.ceil(pos / 4);
                        response[0].data.list[i]["page"] = page;

                    }
                    const sumpageAll = Math.ceil(response[0].data.list.length / 4);
                    setPageAll(sumpageAll);
                    setListBlog(response[0].data.list);
                    setPrvListBlog(response[0].data.list);
                    setListCate(response[1].data);
                    setListTag(response[2].data.list);
                    setLoadSucc(true);
                }
                
                
            } catch (error) {
                console.error(error);
            }
         }

         if(callSuccess){

            callData();

         }

         return () => {
            callSuccess = false;
         }

     },[])

     useEffect(() => {

        var newArr = [];
        var num = 0;

        for(const [key , val] of Object.entries(prvListBlog)){

            if(val["title"].includes(searchData)){

                const pos = num+1;
                const page = Math.ceil(pos / 4);
                val["page"] = page;
                num++;
                newArr.push(val);

            }
        }

        const pageall = Math.ceil(newArr.length / 4);
        setPageAll(pageall);
        setListBlog(newArr);
     },[searchData])

     const changePage = (e , value) => {
         setNextPage(value)
     }
     
    return (<>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={6}>  
                        {
                            loadSucc ?
                                listBlog.length > 0 ? 
                                    listBlog.map((vals ,index) => {
                                            
                                            return vals["page"] === nextPage ? 
                                                         <Grid key={index} item xs={12} md={6}>
                                                            <CardMainBlog data={vals} cate={listCate} tags={listTag}  />
                                                         </Grid>
                                                         :null
                                                    
                                    })
                                :null
                            :null
                        }
                  </Grid>
                  <Stack spacing={2} sx={{mt:5}}>
                        {
                            listBlog.length > 0 ?
                                <Pagination count={pageAll} color="primary" onChange={changePage} />
                            :<Typography>ไม่มีข้อมูล</Typography>
                        }
                        
                 </Stack>
            </Grid>
            
         </>
         )
}

export default SectionRight