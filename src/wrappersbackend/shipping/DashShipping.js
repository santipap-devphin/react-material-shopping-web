import React , {useState , useEffect} from 'react';
import { Typography, Grid , Box , Stack , TextField 
    , Button , InputLabel , MenuItem 
    , FormControl , Select 
    , Accordion , AccordionDetails , AccordionSummary
    , Tab , Chip , Pagination
   }  from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DrafDialog from '../../component/Dialog/DrafDialog';
import ReplayIcon from '@mui/icons-material/Replay';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import endpoint from '../../api/endpoint';
import months from '../../data/dates.json'


const DashShipping = () => {

    const [value, setValue] = useState(0);
    const [openEdit , setOpenEdit] = useState(false);
    const [openReCheck , setOpenReCheck] = useState(false);
    const [shipping ,  setShipping] = useState([]);
    const [shipTxt , setShipTxt] = useState('');
    const [orderID , setOrderID] = useState('');
    let shipSucc = shipping.filter((item) => item.shipping === true);
    let shipErrs = shipping.filter((item) => item.shipping === false);
    const [callData , setCallData] = useState(false);
    const [shipReTxt , setShipReTxt] = useState('');
    const [activePage , setActivePage] = useState(0); 
    const [activeList , setActiveList] = useState([]);
    const [nextPage , setNextPage] = useState(1)
    

    useEffect(() => {

        let callShip = true;

        const reqShipping = async () => {

            try {
                const response = await endpoint.get("/shipping/all");
                if(response.data.code === 1){
                    //console.log(response.data)
                    
                    const datas  = response.data.list.filter((item) => item.shipping === true);
                    datas.sort((a,b) => {
                        return new Date(b["createDate"]) - new Date(a["createDate"]);
                    })
                    setActivePage(Math.ceil(datas.length / 1))
                    setValue(0);
                    setShipping(response.data.list);
                    setActiveList(datas)
                    
                   
                }
                
            } catch (error) {
                console.error(error)
            }
        }

        if(callShip){

            reqShipping();
        }

        return () => {

            setCallData(false);
            callShip = false;

        }
    },[callData])
    
    const handleChangeVal = (event, newValue) => {
       
        if(newValue === 0 ){
             setActiveList(shipSucc);
             setActivePage(Math.ceil(shipSucc.length / 1))
        }
        else if(newValue === 1 ){
            setActiveList(shipErrs);
            setActivePage(Math.ceil(shipErrs.length / 1))
        }
        setNextPage(1);
        setValue(newValue);
    };
    const [expanded, setExpanded] = useState(false);

    const handleChangePanel = (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
            if(isExpanded){

                var sp = panel.split("_")
                setOrderID(sp[2])
                
            }

    };

    const [shipErr, setShipErr] = useState('');
    const [statusRecheck , setStatusRecheck] = useState('resend');
    const handleChange = (event) => {
        setShipErr(event.target.value);
    };
    const confirmEdit = async () => {

        try {
            const response = await endpoint.put("/shipping/shippingproblem" , {order:orderID , shipstatus:shipErr, shiptext:shipTxt})
            if(response.data.code ===1){

                setCallData(true)

            }
            
        } catch (error) {
            console.error(error)
        }

        setOpenEdit(false);

    }
    const confirmReCheck = async () => {

        setOpenReCheck(false);
        //console.log(orderID)
        try {
            const response = await endpoint.put("/shipping/updaterecheck" ,{order:orderID , shipstatus:statusRecheck, shiptext:shipReTxt})
            if(response.data.code === 1){
                setCallData(true)
            }
            
        } catch (error) {
            console.error(error)
        }
        
     }
   
    const clkModalEdit = () => {

        setOpenEdit(true);
    }
    const modalRecheck = () => {

        setOpenReCheck(true);
    }
    const changePage = (event , value) => {

        setNextPage(value)
    }

    const handleRecheck = (e) => {
        setStatusRecheck(e.target.value);
    }

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

 return (<>
            <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Typography variant='h5' sx={{color:"#000"}}>การจัดส่งสินค้า</Typography>   
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
                        
                            <Tab label="จัดส่งเรียบร้อย" icon={<Chip color="success" label={shipSucc.length} />} iconPosition="end" sx={{fontSize:18}}  />
                            <Tab label="พัสดุมีปัญหา" icon={<Chip color="error" label={shipErrs.length} />} iconPosition="end" sx={{fontSize:18}} />
                            
                    </Tabs>
                 
                    </Box>    
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                     {console.log(activeList)}
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
                            {
                                activeList.length > 0  ?
                                     activeList.map((order , index) => {
                                    
                                        const pos = index + 1;
                                        const pagePer = Math.ceil(pos / 1);
                                        order["page"] = pagePer;
                                       
                                        return value === 0 && order.shipping === true ? 
                                                order.page === nextPage ?
                                                    <Accordion key={index} expanded={expanded === `panel_${index}_${order.orderID}`} onChange={handleChangePanel(`panel_${index}_${order.orderID}`)}>
                                                        <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                        
                                                        >
                                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                        {convertDate(order.orderDate)}
                                                        </Typography>
                                                    
                                                        <Chip label={`${order.orderID}`} />
                                                        <Chip label="จัดส่งเรียบร้อย" color="success" sx={{ml:1}} />
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                        <Stack>
                                                            <Typography variant='h6'> เลขพัสดุ {order.shippingNo}</Typography>
                                                        </Stack>
                                                        <Button variant='contained' color="info" sx={{mt:1}} onClick={clkModalEdit}> <ReplayIcon /> แก้ไข</Button>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    : null
                                                :
                                                value === 1 && order.shipping === false ?
                                                order.page === nextPage ?
                                                    <Accordion key={index} expanded={expanded === `panel_${index}_${order.orderID}`} onChange={handleChangePanel(`panel_${index}_${order.orderID}`)}>
                                                        <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel3bh-content"
                                                        id="panel3bh-header"
                                                        >
                                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                        {convertDate(order.orderDate)}
                                                        </Typography>
                                                        <Chip label={`${order.orderID}`}/>
                                                        <Chip label="พัสดุมีปัญหา" color="error" sx={{ml:1}} />
                                                    
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                        <Stack>
                                                            <Typography variant='h6'>{order["shippingstatus"] !== undefined ? order["shippingstatus"] : null}</Typography>
                                                            <Typography variant='h6'>{order["shippingtext"] !== undefined ? order["shippingtext"] : null}</Typography>
                                                        </Stack>
                                                        <Button variant='contained' color="secondary" sx={{mt:1}} onClick={modalRecheck}> <RestartAltIcon /> ตรวจสอบอีกครั้ง</Button>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    : null
                                                :null
                                    })
                                :null
                            }
                          </Box>
                         
                          {
                                activePage === 0 ? 
                                <Box
                                sx={{backgroundColor:"#fff",boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"
                                ,mt:2,
                                ml:1.2,
                                mr:1.2,}}
                                >
                                    <Grid container>
                                            <Grid item xs={12}>
                                                    <Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูล</Typography>
                                            </Grid>
                                    </Grid>
                                </Box>
                            : null
                         }
                        </Grid>
            </Grid>
            <DrafDialog open={openEdit} setOpen={setOpenEdit} title ={"แก้ไขข้อมูล"} confirm={confirmEdit}>
                    <FormControl variant="filled" fullWidth sx={{pb:1}}>
                        <InputLabel id="demo-simple-select-filled-label">เหตุผลที่ทำการแก้ไข</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={shipErr}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>กรุณาเลือกข้อมูล</em>
                        </MenuItem>
                            <MenuItem value={'พัสดุมีปัญหา'}>พัสดุมีปัญหา</MenuItem>
                            <MenuItem value={'ที่อยู่ไม่ชัดเจน'}>ที่อยู่ไม่ชัดเจน</MenuItem>
                            <MenuItem value={'ปฏิเสธการรับสินค้า'}>ปฏิเสธการรับสินค้า</MenuItem>
                            <MenuItem value={'ของไม่ครบ'}>ของไม่ครบ</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField 
                        id="shippingtext" 
                        label="ข้อความเพิ่มเติม" 
                        variant="filled"
                        rows={3}
                        value={shipTxt}
                        onChange={(e) => setShipTxt(e.target.value)}
                        multiline
                        fullWidth
                        sx={{pb:1}}
                    />
            </DrafDialog>
            <DrafDialog open={openReCheck} setOpen={setOpenReCheck} title ={"ตรวจสอบข้อมูลอีกครั้ง"} confirm={confirmReCheck}>
                    <FormControl variant="filled" fullWidth sx={{pb:1}}>
                        <InputLabel id="statusship">สถานะ</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={statusRecheck}
                        onChange={handleRecheck}
                        
                        >
                            <MenuItem value={'resend'}>จัดส่งอีกครั้ง</MenuItem>
                            <MenuItem value={'error'}>ไม่ต้องการรับสินค้า</MenuItem>
                    </Select>
                    </FormControl>
                   
                   {
                    statusRecheck === "resend" ?
                    <TextField 
                            id="shippingre" 
                            label="หมายเลขพัสดุ" 
                            variant="filled"
                            value={shipReTxt}
                            onChange={(e) => setShipReTxt(e.target.value)}
                            fullWidth
                            sx={{pb:1}}
                        />
                        :
                        <TextField 
                            id="shippingretext" 
                            label="เหตุผลที่ไม่รับสินค้า" 
                            variant="filled"
                            value={shipReTxt}
                            onChange={(e) => setShipReTxt(e.target.value)}
                            rows={3}
                            multiline
                            fullWidth
                            sx={{pb:1}}
                    />

                   }
            </DrafDialog>
            {
                activePage !== 0 ? 
                <Stack spacing={2} sx={{mt:1}} alignItems="center">
                    {console.log('inin')}
                    <Pagination count={activePage} page={nextPage} color="primary" onChange={changePage} />
                </Stack>
                :null
            }
        </>
    )
}

export default DashShipping