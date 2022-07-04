import React , {useState} from 'react';
import { styled } from '@mui/material/styles';
import {Typography ,Chip, Grid , Card , CardHeader , CardMedia , CardContent , CardActions , Collapse , IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutorenewIcon from '@mui/icons-material/Autorenew';


const CardOrder = ({RowsP , cardTitle , cardPrice , cardStatus}) => {

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

      const [expanded, setExpanded] =  useState(false);

      const handleExpandClick = () => {
            setExpanded(!expanded);
       };


  return (<Grid item xs={12} md={RowsP}>
            
                <Card>
                        <CardHeader
                            
                            title={cardTitle}
                            subheader="วันสั้งซื้อ September 14, 2016"
                            action={
                                <Chip label={cardStatus === "success" ? "สำเร็จ" 
                                                : cardStatus === "error" ? "ยกเลิก" 
                                                : cardStatus === "warning" ? "กำลังจัดส่ง" : null } />
                            }
                        />
                        
                        <CardMedia
                            component="img"
                            height="194"
                            image="../../assets/img/2.jpg"
                            alt="Paella dish"
                        />
                        <CardContent>
                           <Grid container sx={{pt:1 , pb:1}}>
                                <Grid item xs={6}>
                                    <Typography sx={{textAlign:"left"}}>ราคา</Typography>
                                </Grid>
                                <Grid item xs={6} textAlign="right">
                                    <Typography sx={{alignItems:"right"}}>{cardPrice}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton aria-label="add to Renews">
                                <AutorenewIcon />
                            </IconButton>
                            ซื้ออีกครั้ง
                            <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                aside for 10 minutes.
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                            </CardContent>
                        </Collapse>
                        </Card>
        </Grid>
  )
}

export default CardOrder