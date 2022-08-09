import React , {useState} from 'react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DrafModal from '../Modal/DrafModal';
import imgblank from '../../assets/banner-51.png'
import months from "../../data/dates.json";
import endpoint from '../../api/endpoint';


 const DrafCard = ({data , setStatusCallApi}) => {

  const [openDel , setOpenDel] = useState(false);

  const [chkSwitch , setchkSwitch] = useState(data.status);

  const convertDate = (data) => {

    let newdate;
    let newData;
    //console.log(data)
    if(data.indexOf("_") > -1){
        
        newdate = data.split("_");
        var date = newdate[0];
        //var time = newdate[1];

        var redateyear =  date[0]+date[1]+date[2]+date[3];
        var redatemonth =  date[4]+date[5];
        var redateday =  date[6]+date[7];

        newData = redateday +" "+ months[parseInt(redatemonth)-1].nameshort +" "+ redateyear;
        //console.log(newData)
     }

    return newData;
}

  const confirmDel = async(id) => {
    //alert("ต้องการลบข้อมูล");
    console.log(id)
    setStatusCallApi(false);
    
    try {

        const response = await endpoint.delete(`/product/${id}`);
        if(response.data.code === 1){
            
            setStatusCallApi(true);
        }
        
    } catch (error) {
        console.error(error);
    }
    setOpenDel(false);

  }
  const clkOpenModal = () => {
     setOpenDel(true);
  }
  const locateEdit = (id) => {

    window.location = `product/edit/${id}`
  }
  

  const label = { inputProps: { 'aria-label': 'Switch active' } };

  return (<>
            <Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
            <CardHeader
                title={data.prdTitle}
                subheader={convertDate(data.createdate)}
            />
            <CardMedia
                component="img"
                height="194"
                image={data.imgMain !== "" ?  "http://localhost:7000/"+data.imgMain : imgblank}
                alt="Paella dish"
            />
            <CardContent>
                {
                    <div key={data.id} dangerouslySetInnerHTML={{ __html:data.prdDes.substring(0,400) + "....." }} />
                }
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Switch {...label} checked={chkSwitch} onChange={() => setchkSwitch(!chkSwitch)} />  
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                            <IconButton aria-label="edit" onClick={() => locateEdit(data.id)} >
                                <EditIcon />
                            </IconButton>
                     <IconButton aria-label="del" onClick={clkOpenModal}>
                        <DeleteIcon />
                    </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
            </Card>
            <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูล"} handleConfirm={() => confirmDel(data.id)}>
                หากต้องการลบข้อมูลให้กดยืนยัน
            </DrafModal>
        </>
    );
}
export default DrafCard
