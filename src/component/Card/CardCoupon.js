import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import {Typography, Box  , IconButton , Grid}  from '@mui/material';
import DrafModal from '../Modal/DrafModal';
import DiscountIcon from '@mui/icons-material/Discount';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import months from '../../data/dates.json'
import endpoint from '../../api/endpoint';
const CardCoupon = ({data , setStatusCallApi}) => {

  const [openDel , setOpenDel] = useState(false);
  const [delID , setDelID] = useState('');

  const modalDel  = (id) => {

    setDelID(id)
    setOpenDel(true);
  }
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

  const confirmDelete = async() => {

    setStatusCallApi(false);
    try {
      const reponse = await endpoint.delete(`/coupon/${delID}`)
      if(reponse.data.code === 1){

        setStatusCallApi(true);

      }
      
    } catch (error) {
        console.error(error)
    }
    
    setOpenDel(false);

  }

  return (<Box
                sx={{
                m:1,
                p:1,
                width: "90%",
                backgroundColor: '#ffffff',
                color:"#000",
                boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                }}
            >
            <Grid container>
                    <Grid item xs={2}>
                        <DiscountIcon sx={{fontSize:40 , mt:1}} />
                        <Link to={`/backend/coupon/edit/${data.id}`} style={{textDecoration: "none"}}>
                            <IconButton color="info" aria-label="edit" component="span" >
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton color="error" aria-label="delete" component="span" onClick={() => modalDel(data.id)}>
                                <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='p' sx={{fontSize:20}}> {data.namecoupon} ({data.codecoupon})</Typography>
                        <hr />
                        <Typography variant='p' sx={{fontSize:14}}>{data.detailcoupon} <br /> เริ่มใช่ {convertDate(data.sdate)} | หมดอายุ {convertDate(data.edate)}</Typography>
                      
                    </Grid>
             </Grid>
            <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูล ?"} handleConfirm={() => confirmDelete()}>
             ลบลบ
            </DrafModal>
        </Box>
  )
}

export default CardCoupon