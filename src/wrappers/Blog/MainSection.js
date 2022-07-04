import React from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SectionLeft from './SectionLeft';
import SectionRight from './SectionRight';
import Typography  from '@mui/material/Typography';

const MainSection = () => {
  return (
    <Box sx={{mt:5 , pb:5}}>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{display: { xs: 'none', md: 'flex' }}} >
                    <SectionLeft/>
                </Grid>
                <Grid item xs={12} md={9}>
                        <Grid container spacing={6}>  
                                <Grid item xs={12} md={6}>
                                        <SectionRight />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                        <SectionRight />
                                </Grid>

                         </Grid>
                   
                    
                    
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default MainSection