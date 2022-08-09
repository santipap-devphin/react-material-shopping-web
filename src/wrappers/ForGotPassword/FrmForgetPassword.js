import React from 'react';
import { Stack ,Container, Box , TextField , IconButton , InputAdornment , Button  , Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
const FrmForgetPassword = () => {


  return (
        <Container>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{pt:2 , pb:2}}>
                <Grid item xs={12} md={8}>
                    <Box className='login-register'>
                        <form>
                            <Stack spacing={2} >

                                    <TextField
                                        label="อีเมล์"
                                        id="emails"
                                        type="email"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                                        }}
                                    
                                        variant="outlined"
                                        size="small"
                                        required
                                        
                                        />

                                    <Grid container sx={{pt:1 , pb:1}}>
                                        <Grid item xs={12}>
                                            <Button type='submit' variant="contained"> ยืนยัน</Button>
                                        </Grid>
                                    
                                    </Grid>
                             </Stack>
                        </form>
                    </Box>
                </Grid>

            </Grid>

        </Container>
  )
}

export default FrmForgetPassword