import React , {useState} from 'react';
import { Stack , Typography , Box , Accordion , AccordionSummary , AccordionDetails , TextField , InputAdornment , Button , Grid  , IconButton , Input } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FilePresentIcon from '@mui/icons-material/FilePresent';
const SecConfirmU = () => {

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel)
    setExpanded(isExpanded ? panel : false);
  };
  const handleClk = () => {
    

  }

  return (
        <Stack spacing={1} sx={{mt:5 , mb:5}}>
            <Box sx={{ width: '100%',color:"#000" , backgroundColor:"#f5f0e0", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" , p:2.5}}>
              <Accordion expanded={expanded === 'panel1'} sx={{backgroundColor:"#ffffff"}} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                 
                >
                  <Typography variant='h5'>แจ้งชำระเงิน จาก หมายเลขใบสั้งซื้อ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                           <TextField
                            label="หมายเลขคำสั้งซื้อ"
                            id="name-surname"
                            InputProps={{
                                endAdornment: <InputAdornment position="start"><ConfirmationNumberIcon /></InputAdornment>,
                            }}
                            variant="outlined"
                            size="small"
                            fullWidth
                            />
                            <Button
                            variant="contained"
                            component="label"
                            sx={{mt:2 , backgroundColor:"#1976d2" , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                          >
                            <FileUploadIcon/>
                             อัพโหลดสลิปโอนเงิน
                            <input
                              type="file"
                              hidden
                            />
                          </Button>
                           <Stack sx={{mt: 1 , mb:1}}>
                             <img src="../../assets/img/noimage.jpg" style={{width:"50%"}} alt="No image" />
                           </Stack>
                           <hr/>
                           <Button variant="contained" color="warning" sx={{"&:hover": { backgroundColor:"#C2B4D6"}}}>
                           <SendIcon sx={{pr:1}}/>
                              ยืนยัน
                          </Button>
                 </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} sx={{backgroundColor:"#ffffff" , mt:2}} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography variant='h5'>แจ้งชำระเงิน จาก แซท</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box sx={{backgroundColor:"#57648C" , ml:"20px" , mr:"20px" , color:"#fff" , borderRadius:2}}>
                  <Grid container>
                         <Grid item xs={6}>
                             <Stack spacing={2}>
                                <Stack direction="row">
                                    <AccountCircleIcon sx={{p:1 , fontSize:32}} /> <Typography variant='h5' sx={{p:1}}>ชื่อลูกค้า</Typography>           
                                </Stack>
                             </Stack>
                         </Grid>
                         <Grid item xs={6} textAlign="right">
                         <Button
                            variant="contained"
                            component="label"
                            size="small"
                            sx={{mt:1 , backgroundColor:"#1976d2" , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                          >
                            <FileUploadIcon/>
                             
                            <input
                              type="file"
                              hidden
                            />
                          </Button>
                         </Grid>
                  </Grid>
                 
                </Box>
                <div id="messages">
                      <div className="msg-left">
                          Hi..
                      </div>
                      <div className="msg-right">
                          Hello
                      </div>
                      <div className="msg-left">
                          How are you.
                      </div>
                      <div className="msg-right">
                        I am fine and you
                      </div>
                      <div className="msg-left">
                          fine
                      </div>
                      <div className="msg-right">
                          This is chat box
                      </div>
                      <div className="msg-left">
                          wow nice work
                          wow nice work
                          wow nice work<br/>
                          wow nice work
                          wow nice work
                          wow nice work
                      </div>
                  </div>
                  <Grid container spacing={3}>
                         <Grid item xs={10}>
                         <TextField 
                          id="filled-basic" 
                          label="พิมพ์ข้อความ" 
                          variant="filled"
                          InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClk}
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
                        
                          <Button variant="contained" endIcon={<SendIcon />} sx={{mt:"10px" , height:80}}>
                              Send
                          </Button>
                         </Grid>
                  </Grid>
                 
                </AccordionDetails>
              </Accordion>
            </Box>
        </Stack>   
  )
}

export default SecConfirmU