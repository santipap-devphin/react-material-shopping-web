import React , {useState} from 'react';
import { Typography, Grid , Box , Stack , TextField 
    , Button , InputLabel , MenuItem 
    , FormControl , Select 
    , Accordion , AccordionDetails , AccordionSummary
    , Tab , Chip , Pagination
   }  from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DrafModal from '../../component/Modal/DrafModal';
import ReplayIcon from '@mui/icons-material/Replay';
import slipblank from '../../assets/slipblank.jpg'
const DashConfirm = () => {
    const [value, setValue] = useState(0);

    const [openAppove , setOpenAppove] = useState(false);

    const handleChangeVal = (event, newValue) => {
      console.log(newValue);
      setValue(newValue);
    };
    const [expanded, setExpanded] = useState(false);

    const handleChangePanel = (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
    };

    const [statusCon, setStatusCon] = useState('');

    const handleChange = (event) => {
        setStatusCon(event.target.value);
    };

    const confirmAppove = () => {

        alert("Appove");
        setOpenAppove(false)
        setStatusCon('');
    }
    const clkShowModal = () => {

        setOpenAppove(true)

    }
    const changePage = () => {


    }

  return (<>
                <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Typography variant='h5'>Confrim Order</Typography>   
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField id="filled-basic" label="ค้นหา" variant="filled" size="small" fullWidth />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} >
                    <Button variant="contained"  sx={{width:195,height:48}}><DownloadForOfflineIcon /> Download CSV</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            mt:2,
                            ml:1.2,
                            mr:1.2,
                            bgcolor: 'background.paper',
                            boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d",
                            maxWidth: { xs: 400 , sm: 800 , md: "100%"}
                        }}
                        >
                        <Tabs
                            value={value}
                            onChange={handleChangeVal}
                            variant="scrollable"
                            scrollButtons
                            aria-label="visible arrows tabs example"
                            
                            sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                            },
                            }}
                            
                            >
                            <Tab label="ทั้งหมด" sx={{fontSize:18}} />
                            <Tab label="รอการตรวจสอบ" sx={{fontSize:18}} />
                            <Tab label="ตรวจสอบเรียบร้อย" sx={{fontSize:18}} />
                            <Tab label="ยอดชำระมีปัญหา" sx={{fontSize:18}} />
                            
                    </Tabs>
                    
                    </Box>    
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            mt:2,
                            ml:1.2,
                            mr:1.2,
                            bgcolor: 'none',
                            boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d",
                            maxWidth: { xs: 400 , sm: 800 , md: "100%"}
                        }}
                        >
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangePanel('panel1')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                
                                >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    01 มิย 65
                                </Typography>
                                
                                <Chip label="OrderNo 1145525" />
                                <Chip label="สำเร็จ" color="success" sx={{ml:1}} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack>
                                        <img src={slipblank} alt="blank" style={{maxWidth:300}} />
                                    </Stack>
                                    <Button variant='contained' color="info" sx={{m:1}} onClick={clkShowModal}> <ReplayIcon /> แก้ไข</Button>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChangePanel('panel2')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}> 02 มิย 65</Typography>
                                <Chip label="OrderNo 2255663"/>
                                <Chip label="รอตรวจสอบ" color="info" sx={{ml:1}} />
                                
                                </AccordionSummary>
                                <AccordionDetails>
                                <Stack>
                                        <img src={slipblank} alt="blank" style={{maxWidth:300}} />
                                    </Stack>
                                    <Button variant='contained'  sx={{m:1}} onClick={clkShowModal}> <CheckCircleIcon /> ตรวจสอบชำระ</Button>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChangePanel('panel3')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                03 มิย 65
                                </Typography>
                                <Chip label="OrderNo 63366522"/>
                                <Chip label="มีปัญหา" color="error" sx={{ml:1}} />
                                
                                </AccordionSummary>
                                <AccordionDetails>
                                <Stack>
                                    <Typography variant='h6'>ยอดชำระไม่ถูกต้อง</Typography>
                                        <img src={slipblank} alt="blank" style={{maxWidth:300}} />
                                        
                                    </Stack>
                                    <Button variant='contained'  sx={{m:1}} onClick={clkShowModal}> <CheckCircleIcon /> ตรวจสอบชำระ</Button>
                                </AccordionDetails>
                            </Accordion>
                            
                                
                        </Box>
                        </Grid>
            </Grid>
            <DrafModal open={openAppove} setOpen={setOpenAppove} txthead ={"ยืนยันตรวจสอบยอดชำระ"} handleConfirm={confirmAppove}>
                        
                    <FormControl variant="filled" fullWidth sx={{pb:1}}>
                        <InputLabel id="demo-simple-select-filled-label">สถานะ</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={statusCon}
                        onChange={handleChange}
                        
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'success'}>สลิปถูกต้อง</MenuItem>
                        <MenuItem value={'error'}>สลิปไม่ถูกต้อง</MenuItem>
                        <MenuItem value={'hold'}>ยอดเงินไม่ถูกต้อง</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        id="filled-basic" 
                        label="ข้อความเพิ่มเติม" 
                        variant="filled"
                        rows={2}
                        multiline
                        fullWidth
                            />
                        <Typography sx={{color:"red"}}>*** หมายเหตุ หากไม่มีให้เว้นว่างไว้</Typography>

            </DrafModal>
            <Stack spacing={2} sx={{mt:1}} alignItems="center">
                <Pagination count={3} color="primary" onChange={changePage} />
            </Stack>
        </>
    )
}

export default DashConfirm