import React , {useState} from 'react';
import {Typography, Box  , IconButton , Grid , Stack  , Collapse }  from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import DrafModal from '../Modal/DrafModal';
import months from '../../data/dates.json'
import endpoint from '../../api/endpoint';

const BoxPromotion = ({promo , product , setStatusCallApi}) => {

    const [expanded, setExpanded] = useState(false);

    const [openDel , setOpenDel] = useState(false);

    const [delID , setDelID] = useState('');

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const convertDate = (data) => {
        var lastdate;
        //console.log(months)
        if(data.indexOf("T") > -1){
    
          var spdate = data.split("T");
          var splast = spdate[0].split("-");
          var last = splast[2] +" " + months[parseInt(splast[1])-1].namemonth+" "+ splast[0];
    
          lastdate = last;
        }
    
        return lastdate;
    
    
      }

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

  const confirmDelete = async () => {

        setStatusCallApi(false);
        
        try {

            const response = await endpoint.delete(`/promotion/${delID}`);
            if(response.data.code === 1){

                setStatusCallApi(true);
                
            }
            
        } catch (error) {
            
        }
        console.log(delID)
        setOpenDel(false);
  }
  const modalShow = (id) => {

        setDelID(id)
        setOpenDel(true);
  }

  return (<Box
    sx={{
    m:1,
    p:1,
    width: "45%",
    backgroundColor: '#ffffff',
    color:"#000",
    boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
    }}
    >
       
        <Grid container>
                    <Grid item xs={2}>
                            <MonetizationOnIcon sx={{fontSize:90}} />
                            {/*<IconButton color="info" aria-label="edit" component="span" >
                                <EditIcon />
                            </IconButton>*/}
                    </Grid>
                    <Grid item xs={10}>
                            <Stack spacing={1}>
                                 <Typography variant='p'>{promo.title}</Typography>
                                 <Typography variant='p'>ลดสินค้าร่วมรายการ {promo.detailpro}</Typography>
                                 <Typography variant='p'>วันเริ่มรายการ {convertDate(promo.sdate)} | วันหมดโปรโมชั่น {convertDate(promo.edate)}</Typography>
                                 
                            </Stack>
                           
                    </Grid>
                    <Grid item xs={6} sx={{p:1}}>
                        <Link to={`/backend/promotion/edit/${promo.id}`} style={{textDecoration: "none"}}>
                            <IconButton color="info" aria-label="edit" component="span" >
                                <EditIcon />
                            </IconButton>   
                        </Link>
                        <IconButton color="error" aria-label="delete" component="span" onClick={() => modalShow(promo.id)} >
                            <DeleteIcon />
                        </IconButton>   
                    </Grid>
                    <Grid item xs={6} sx={{p:1}} textAlign="right">
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                                <ExpandMoreIcon />
                        </ExpandMore>    
                    </Grid>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box>
                        <hr />
                        <Typography paragraph>สินค้าร่วมรายการ :</Typography>
                        {
                            product.map((vals , key) => {
                                
                                console.log(vals.id , promo.chooseprd)
                                if(promo.chooseprd.indexOf(vals.id) > -1)
                                {

                                    return (
                                
                                        <Chip
                                        key={key}
                                        label={vals.prdTitle}
                                        sx={{m:0.5}}
                                        />
                                    
                                    );

                                }
                               
                            })
                        }
                      
                        </Box>
                    </Collapse>
            </Grid>
            <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูล ?"} handleConfirm={() => confirmDelete()}>
                        ลบลบลบลบลบล
            </DrafModal>
    </Box>

  )
}

export default BoxPromotion