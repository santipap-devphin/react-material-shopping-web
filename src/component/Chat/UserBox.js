import React  from 'react';
import {Grid, Typography , Divider , Chip} from '@mui/material';
import img from "../../assets/user-profile.png";
import dateshort from '../../data/dates.json'
const UserBox = ({user , activeChat , setActiveChat , newMessage}) => {

 
  const clickPerUser = (e) => {
   
    setActiveChat(e.currentTarget.id)

  }
  const convertDate = (date) => {

    var sp;
    var sp_last;
    if(date.indexOf("_") >-1){

        sp = date.split("_");
        sp_last = sp[0][6]+sp[0][7]+ " " +dateshort[Number(sp[0][4]+sp[0][5])].nameshort;
    }

    return sp_last;

  }

  if(activeChat === `chat-${user.userId}`){

        user.status = 0;
        
      

  }

  


  return (<div id={`chat-${user.userId}`} style={{backgroundColor:activeChat === `chat-${user.userId}` ?  "#ebebeb" : "#ffffff"}} onClick={clickPerUser}>
            <Grid className='chat-pointer' container rowSpacing={2} 
            sx={{
                mt:1
                ,mb:1
                ,'&:hover': {
                    backgroundColor: '#FBF1d5',
                    opacity: [0.9, 0.8, 0.7],
                        },
                }} 
                >
                <Grid item xs={12} sm={12} md={12} lg={2} textAlign="center">
                    <img src={img} style={{width:50}} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} textAlign="left">
                    <Typography>{user.username}<br /> {user.message}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} textAlign="center">
                {user.userId ===  newMessage.userId  ? <Chip label="สมาชิกใหม่" size="small" color="warning" /> :null}
               
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} textAlign="center">
                    <Typography variant='p'>{convertDate(user.date)}</Typography>
                    <br/>
                    {
                        user.status !== 0 ? <Chip label={user.status} size="small" color="info" /> : null
                    }
                    
                  
                </Grid>
            </Grid>
            <Divider />
        </div>
  )
}

export default UserBox