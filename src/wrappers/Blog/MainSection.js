import React , {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SectionLeft from './SectionLeft';
import SectionRight from './SectionRight';

const MainSection = () => {
  const [searchData , setSearchData] = useState('');

  return (
    <Box sx={{mt:5 , pb:5}}>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{display: { xs: 'none', md: 'flex' }}} >
                    <SectionLeft searchData={searchData} setSearchData={setSearchData}/>
                </Grid>
                <SectionRight searchData={searchData}/>
            </Grid>
        </Container>
    </Box>
  )
}

export default MainSection