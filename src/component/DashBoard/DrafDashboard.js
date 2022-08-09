import React , {Fragment, useContext} from 'react';
import {Typography, Grid , Stack}  from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import DataContext from '../../context/DataContext';
import HeaderDashBoard from '../../layout/HeaderDashBoard';
import FooterDashBoard from '../../layout/FooterDashBoard';
import MenuDashboardMobile from '../Menu/MenuDashboardMobile';
import MenuDashboard from '../Menu/MenuDashboard';

const DrafDashboard = ({txtpage ,children}) => {

  const {theme , scaleTablet , matches} = useContext(DataContext);

  return (<ThemeProvider theme={theme}>
            <Fragment>
                <HeaderDashBoard />
                <Grid container sx={{backgroundColor:"#f5f5f5"}}>
                        <Grid item xs={12} md={1} sx={{mt:scaleTablet && !matches ? 0 : 10}}>
                        {
                        scaleTablet && !matches   ? <MenuDashboard /> : <MenuDashboardMobile />
                        }
                        </Grid>
                        <Grid item xs={12} md={11} sx={{mt:matches ? 5 : 10 , backgroundColor:"#f5f5f5" , mt: { xs: 5, sm: 10 }}}>
                            <Stack spacing={2} sx={{ml:matches ? 0 : 10 , mr:matches ? 0 : 5}}>
                            <Typography variant='h6' sx={{color:"#000"}}>{txtpage}</Typography>
                            <hr/>
                            <Grid container spacing={1} sx={{ml:matches ? 0 : 10}}>
                                    {children}
                                <FooterDashBoard />
                            </Grid>
                            
                        </Stack>

                        </Grid>

                </Grid>
            </Fragment>
        </ThemeProvider>
   )
}

export default DrafDashboard