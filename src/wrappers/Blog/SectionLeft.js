import React from 'react';
import { Stack , TextField , InputAdornment , Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SectionLeft = () => {
  return (
        <Stack spacing={1} sx={{color:"#000"}}>
                <TextField
                    label="ค้นหา"
                    id="searchblog"
                    InputProps={{
                        endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                    variant="outlined"
                    size="small"
                     />
                     <Stack spacing={2} sx={{pt:2 , pb:2}}>
                          <Typography variant='h6'>Recent Projects</Typography>
                          <Stack spacing={2} direction="row">
                                <img src="../../assets/img/sidebar-1.jpg" alt='img-sidebar-text'/>
                                <Stack spacing={1}>
                                     <Typography variant='p'>PHOTOGRAPHY</Typography>
                                     <Typography variant='h6'>T- Shart And Jeans</Typography>
                                </Stack>
                          </Stack>

                     </Stack>

        </Stack>
  )
}

export default SectionLeft