import React from 'react'
import {Stack,Typography ,Button ,IconButton} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const ProductRecom = ({cardBg , menuId}) => {
  return (
    <React.Fragment>
        <Typography
            style={{color:"white", marginBottom:"70px"}}
            component="h2"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            className="useFontKanit"
            >
                สินค้าแนะนำ
        </Typography>
         <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={{ xs: 3, sm: 2, md: 4 }}>
                 <Card sx={{ width: 370 , height:215 }} style={cardBg}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" 
                                style={{ lineHeight: 1
                                        ,color: "#E81C2E"}}>
                                -70% Off
                            </Typography>
                            <Typography variant="h4" color="#fff">
                                Easy Chair
                            </Typography>
                        </CardContent>
                        <CardActions sx={{pt:7}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                
                                >
                                    <ArrowForwardIosIcon sx={{color:"#E81C2E"}} />
                            </IconButton>
                        <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                        </CardActions>
                </Card>
                <Card sx={{ width: 370 , height:215 }} style={cardBg}>
                    <CardContent>
                            <Typography gutterBottom variant="h5" component="div" 
                            style={{ lineHeight: 1
                                    ,color: "#E81C2E"}}>
                            -70% Off
                            </Typography>
                            <Typography variant="h4" color="#fff">
                                Sofa
                            </Typography>
                    </CardContent>
                    <CardActions sx={{pt:7}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <ArrowForwardIosIcon sx={{color:"#E81C2E"}} />
                            </IconButton>
                    <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                  </CardActions>
                </Card>
                <Card sx={{ width: 370 , height:215 }} style={cardBg}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" 
                            style={{ lineHeight: 1
                                ,color: "#E81C2E"}}>
                            -70% Off
                        </Typography>
                        <Typography variant="h4" color="#fff">
                            Office Chair
                        </Typography>
                  </CardContent>
                  <CardActions sx={{pt:7}}>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        
                      >
                    <ArrowForwardIosIcon sx={{color:"#E81C2E"}} />
                  </IconButton>
                    <Button size="large" sx={{color:"#fff"}}>รายละเอียด</Button>
                  </CardActions>
                </Card>
      </Stack>
      </React.Fragment>
  )
}

export default ProductRecom