import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography  from '@mui/material/Typography';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import blognew from '../../data/blog/blogs.json';

const MainContent = ({id}) => {

  let navigate = useNavigate();
  let data = null;
  const findpost = blognew.find((blog) => blog.blogId === parseInt(id));
  //console.log(findpost)
  if(findpost === undefined) navigate('/notfound')
 
  return (
    <Box sx={{m:5}}>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{display: { xs: 'none', md: 'flex' }}} >
                    <LeftContent/>
                </Grid>
                <Grid item xs={12} md={9}>
                        <Grid container spacing={6}>  
                                <Grid item xs={12} md={12}>
                                       <RightContent data={findpost} fulldata={blognew} />
                                </Grid>
                               

                         </Grid>
                   
                    
                    
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default MainContent