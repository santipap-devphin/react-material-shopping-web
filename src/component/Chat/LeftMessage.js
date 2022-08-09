import React from 'react'
import {Box  ,Grid , Stack} from '@mui/material';
import subimg from "../../assets/prdimg.jpg"
const LeftMessage = ({msg , date}) => {
 var spdate ;
 var sptime;
 var spdata;
 var spLast;
 if(date.indexOf(",") > -1){

    //console.log(date)
    spdate = date.split(",");
    sptime = spdate[1].split(" ");
   
    if(sptime[2] === "PM"){

        spdata = sptime[1].split(":");
        spLast = Number(spdata[0])+12 + ":" + spdata[1];

    }
 }

  return (<Grid container sx={{mt:5}} justifyContent="left" alignItems="left">
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} sx={{pl:2}}>
                                <img src={subimg} style={{width:40 , borderRadius:20}} />
                                <Box className="msgLeft">
                                        {msg}
                                </Box>
                        </Stack>
                        
                    </Stack>
                    <span style={{fontSize:14}}>{spLast} | {spdate[0]}</span>
                </Grid>
            </Grid>
  )
}

export default LeftMessage