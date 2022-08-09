import React , {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import blognew from '../../data/blog/blogs.json';
import endpoint from '../../api/endpoint';

const MainContent = ({id}) => {

  const [blogAll , setBlogAll] = useState([]);
  const [blogData , setBlogData] = useState([]);
  const [loadSuccess , setLoadSuccess] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {

    let callSuccess = true;

    const fetchData = async (id) => {
       try {
        const response = await endpoint.get(`/blogs/front/${id}`)
         console.log(response)
         if(response.data.code === 1){
            setBlogAll(response.data.blogall);
            setBlogData(response.data.list);
            setLoadSuccess(true);
         }else if(response.data.code === 6){
            navigate('/notfound');
         }
        
        
        } catch (error) {
            console.error(error)
        }

    }

    if(callSuccess){
      fetchData(id);
    }

    return () => {
      callSuccess = false;
    }
   },[loadSuccess])

 

  
 
  return (
    <Box sx={{pt:5 , pb:5}}>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{display: { xs: 'none', md: 'flex' }}} >
                    <LeftContent/>
                </Grid>
                <Grid item xs={12} md={9}>
                        <Grid container spacing={6}>  
                                <Grid item xs={12} md={12}>
                                    {
                                        loadSuccess ? <RightContent data={blogData} fulldata={blogAll} setLoadSuccess={setLoadSuccess} /> : null
                                    }
                                       
                                </Grid>
                          </Grid>
                  </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default MainContent