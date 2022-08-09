import React , {useRef , useEffect}  from 'react';
import {Box  ,Grid} from '@mui/material';
import TypeMessage from './TypeMessage';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

const MessageBoxRight = ({msgUser  , activeChat  , typeMessage , setTypeMessage , sendMsg}) => {

    let userID;
    
     if(activeChat.indexOf("-") > - 1){

        var sp = activeChat.split("-");
        userID = sp[1];

     }
     const handleScroll = () => {

        //console.log(window.scrollY)
  
        const header = document.getElementById("boxsmsgright");
            
        header.scrollTop = header.scrollHeight;
    };

     useEffect(() => {
     
            //console.log('in onload');
            //window.addEventListener("scroll", handleScroll);
            window.addEventListener('load', (event) => {
                //console.log('page is fully loaded');
                handleScroll();
            });
            return () => {
                console.log('return')
              //window.removeEventListener("scroll", handleScroll);
              handleScroll();

            };
        
       
      }, [msgUser]);

return (<Grid item xs={12} sm={12} md={12} lg={8}>
                <Box sx={{backgroundColor:"#030f27",color:"#dfb163" , p:2}}>Name User</Box>
                    <Box id='boxsmsgright'>
                        <div id="dvchat">
                            {
                                
                                msgUser.length > 0 ?

                                msgUser.map((data , index) => {
                                    
                                    if(data.id === Number(userID)){

                                        return data.name !== "admin" ? 
                                            <LeftMessage key={index} msg={data.message} date={data.date} /> 
                                            :<RightMessage key={index} msg={data.message} date={data.date} />
                                    }
                                    
                                })

                                :null
                               
                            }
                        
                         </div>
                        </Box>
                        <TypeMessage typeMessage={typeMessage} setTypeMessage={setTypeMessage} sendMsg={sendMsg} />
                        
                 </Grid> 
  )
}

export default MessageBoxRight