import React , {useState , useContext , useEffect} from 'react';
import { Stack , Typography , Box , TextField , InputAdornment , Button , Grid  , IconButton  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import MsgRight from '../../component/Message/MsgRight';
import MsgLeft from '../../component/Message/MsgLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DataContext from '../../context/DataContext';
import endpoint from '../../api/endpoint';
import { useSocket , socketEmit } from '../../hook/useSocket';
import { format } from 'date-fns';

const SecChatUser = () => {

    const {socket , statusConnect}  =   useSocket();
    const {userLogin}   = useContext(DataContext);
    const [dataChatDetail , setDataChatDetail] = useState([]);
    const [typeMessage , setTypeMessage]  = useState('');
    var userID = userLogin !== null ? userLogin.id : 0;


    useEffect(() => {

        console.log('fetchMsg' , userID)
        
        let isApiSubscribed = true;

        const fetchMsg = async() => {

                try {
                    const response = await endpoint.get(`/message/${userID}`)
                    //console.log(response)
                    if(response.status === 200 && response.statusText === "OK"){
                            //console.log(response)
                            setDataChatDetail(response.data)
                            
                    }
                    
                } catch (error) {
                    console.error(error)
                }

        }

        if(isApiSubscribed === true && userID !== 0){
            fetchMsg();
        }

        return () => {
            // cancel the subscription
           isApiSubscribed = false;
        };

    },[])

    useEffect(()=> {

           let isApiSubscribed = true;

           if(!statusConnect && isApiSubscribed) return {error: "socket not connect"}

            console.log('socket user');

            socket.on('response-message-from-user', message => {

                setDataChatDetail(messages => [ ...messages , message ])
            
                setTypeMessage('');

            });

            socket.on('message-from-admin', message => {

                if(message.id === Number(userID)){

                    setDataChatDetail(messages => [ ...messages , message ]);
                    setTypeMessage('');
                }
            });

            return () => {
                // cancel the subscription
               isApiSubscribed = false;
            };

    },[statusConnect , socket])

    const handleClk = () => {

        if(!typeMessage) return {error: "not message required"}

       // console.log(userLogin)

        const datetime = format(new Date() , 'MMMM dd ,yyyy pp');

        let msg = {id:userLogin.id,img:null, date:datetime ,name:userLogin.username, message:typeMessage , status:"unread"}
        //let msg = {id:Number(typeMessageList.length)+1,username:datas.name , msg:typeMessage , userId :datas.id.toString(), date:datetime}
        
        socketEmit('chat-message-from-user' , msg)

        //console.log(msg)

    }

    const handleScrollBottom = () => {

        //console.log(window.scrollY)
        var spurl = window.location.href;
        if(spurl.indexOf("chatuser") > -1){

            const header = document.getElementById("messages");
            header.scrollTop = header.scrollHeight;
        }
       
    };

    useEffect(() => {

        window.addEventListener('load', (event) => {
            //console.log('page is fully loaded');
            handleScrollBottom();
        });
        return () => {
            console.log('return')
          //window.removeEventListener("scroll", handleScroll);
          handleScrollBottom();

        };
  },[dataChatDetail])

  return ( <Stack spacing={1} sx={{mt:5 , mb:5}}>
                    <Box sx={{ width: '100%',color:"#000" , backgroundColor:"#fff", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" , p:2.5}}>
                    <Box sx={{backgroundColor:"#57648C" , ml:"20px" , mr:"20px" , color:"#fff" , borderRadius:2}}>
                  <Grid container>
                         <Grid item xs={6}>
                             <Stack spacing={2}>
                                <Stack direction="row">
                                    <AccountCircleIcon sx={{p:1 , fontSize:32}} /> <Typography variant='h5' sx={{p:1}}>{userLogin !== null ? userLogin.username : null}</Typography>           
                                </Stack>
                             </Stack>
                         </Grid>
                         <Grid item xs={6} textAlign="right">
                        
                         </Grid>
                  </Grid>
                 
                </Box>
                  
                        <div id="messages">

                            {
                                dataChatDetail.length > 0 ?
                                dataChatDetail.map((data , keys) => {
                                    return data.name === "admin" ? <MsgLeft key={keys} content={data} /> : <MsgRight key={keys} content={data} />
                                })

                                :null
                            }
                           
                            
                        
                        </div>
                        <Grid container spacing={3}>
                                <Grid item xs={10}>
                                <TextField 
                                id="filled-basic" 
                                label="พิมพ์ข้อความ" 
                                variant="filled"
                                value={typeMessage}
                                onChange={(e) => setTypeMessage(e.target.value) }
                                InputProps={{
                                    endAdornment: 
                                    <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            
                                            sx={{color:"#57648C"}}
                                            >
                                            <FilePresentIcon sx={{fontSize:32}}/>
                                            
                                            </IconButton>
                                    </InputAdornment>,
                                }}
                                multiline
                                rows={2}
                                sx={{mt: "10px", ml:"20px"}}
                                fullWidth
                                />
                                </Grid>
                                <Grid item xs={2}>
                                
                                <Button variant="contained" endIcon={<SendIcon />} sx={{mt:"10px" , height:80}} onClick={handleClk}>
                                    Send
                                </Button>
                                </Grid>
                        </Grid>
                       
                    </Box>
            </Stack>   
  )
}

export default SecChatUser