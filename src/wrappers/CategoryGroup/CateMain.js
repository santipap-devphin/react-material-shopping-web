import React  from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CateContent from './CateContent';


const CateMain = () => {
    return (<Box sx={{mt:5 , pb:5}}>
                <Container>
                    <CateContent />
                </Container>
            </Box>
      )
}

export default CateMain