import React  from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TagContent from './TagContent';

const TagMain = () => {
  return (<Box sx={{mt:5 , pb:5}}>
                <Container>
                    <TagContent />
                </Container>
         </Box>
        )
}

export default TagMain