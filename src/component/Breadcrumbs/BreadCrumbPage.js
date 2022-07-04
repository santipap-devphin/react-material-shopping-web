import React from 'react'
import {emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

const BreadCrumbPage = ({pagename}) => {

    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[500];
        return {
          backgroundColor,
          height: theme.spacing(3),
          color: "#202C45",
          fontSize:20,
          fontWeight: theme.typography.fontWeightRegular,
          '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
          },
          '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
          },
        };
      });

  return (
            <Stack spacing={0} sx={{alignItems:"center" , p:5 , backgroundColor:"#fdbe33"}}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={`/`} style={{ textDecoration: 'none' , color:"#202C45" }}>
                  <StyledBreadcrumb
                      label="หน้าแรก"
                      icon={<HomeIcon fontSize="medium" color="#030f27" />}
                    
                  />
              </Link>
              <Link to={`/${pagename}`} style={{ textDecoration: 'none', color:"#030f27"}}><StyledBreadcrumb label={pagename} /></Link>
            </Breadcrumbs>
        </Stack>
  )
}

export default BreadCrumbPage