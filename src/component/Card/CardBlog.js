import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DrafModal from '../Modal/DrafModal';
import imgblank from '../../assets/banner-51.png'
import months from '../../data/dates.json'
import endpoint from '../../api/endpoint';


const CardBlog = ({blogs , tags , category , setStatusCallApi}) => {
    const [openDel , setOpenDel] = useState(false);
  const [chkSwitch , setchkSwitch] = useState(true);

  const convertDate = (data) => {
    var lastdate;
    //console.log(months)
    if(data.indexOf("_") > -1){

      var spdate = data.split("_");
      var dates = spdate[0];
      var mon = dates[4]+dates[5];
      var years = dates[0]+dates[1]+dates[2]+dates[3];
      var last = dates[6]+dates[7] +" " + months[parseInt(mon)-1].namemonth+" "+ years;

      lastdate = last;
    }

    return lastdate;


  }
const confirmDel = async(id) => {
    
    setStatusCallApi(false);
    try {
        const response = await endpoint.delete(`/blogs/${id}`);
        if(response.data.code === 1){
            setStatusCallApi(true)
        }

        
    } catch (error) {
        console.error(error);
    }
    

    setOpenDel(false);

  }
  const clkOpenModal = () => {
     setOpenDel(true);
  }
  const label = { inputProps: { 'aria-label': 'Switch active' } };
  return (<Grid item xs={12} sm={6}>
                <Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
                <CardHeader
                    title={blogs.title}
                    subheader={convertDate(blogs.createdate)}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={blogs.imgblog !== "" ? `http://localhost:7000/${blogs.imgblog}` : imgblank}
                    alt="Paella dish"
                />
                <CardContent>
                    
                    <Typography variant="body2" color="text.secondary">
                        หมวดหมู่ {category.catename}
                    </Typography>
                    <Typography variant="p" color="text.secondary">
                        
                        {
                            
                            blogs.tag.length > 0 ? 
                            
                                blogs.tag.map((value , index) => {

                                    //console.log(value)
                                    const tagsnameFind = tags.find((item) => item.id  === value)
                                    return (<Chip key={index} label={tagsnameFind.tagname} sx={{mt:1,mr:1}} />);
                                    
                                })
                            :null
                        }
                    </Typography>
                </CardContent>
            
                <CardActions disableSpacing>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Switch {...label} checked={chkSwitch} onChange={() => setchkSwitch(!chkSwitch)} />  
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Link to={`/backend/blog/edit/${blogs.id}`} style={{textDecoration: "none"}}>
                                <IconButton aria-label="edit" >
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        <IconButton aria-label="del" onClick={clkOpenModal}>
                            <DeleteIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
                </Card>
                <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูล"} handleConfirm={() => confirmDel(blogs.id)}>
                    หากต้องการลบข้อมูลให้กดยืนยัน
                </DrafModal>
            </Grid>
        )
}

export default CardBlog