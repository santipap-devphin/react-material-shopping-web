import React , {useState , useEffect} from 'react';
import { Typography, Grid , Box , Stack , TextField , Button  , Pagination}  from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Chip from '@mui/material/Chip';
import PanelOrdersNew from '../../component/Panel/PanelOrdersNew';
import endpoint from '../../api/endpoint';

const DashOrder = () => {

  const [listOrders , setListOrders] = useState([]);
  const [chkStatus , setChkStatus] = useState(false);
  const [value, setValue] = useState(0);
  let check = listOrders.filter((item) => item.status ==="new" && item.notify === true);
  let waitShip =  listOrders.filter((item) => item.status ==="pending" && item.payment === true);
  let waittranfer =  listOrders.filter((item) => item.status ==="new" && item.notify === false);
  let cancelOrder =  listOrders.filter((item) => item.status ==="cancel");
  const [listActive , setListActive] = useState([]);
  const [activePage , setActivePage] = useState(0); 
  const [nextPage , setNextPage] = useState(1);
  const [searchOrder , setSearchOrder] = useState('');
  const [searchStatus , setSearchStatus] = useState(false);

  useEffect(() => {

    let CallApi = true;

    const callOrder = async () => {
        console.log('recall')
        try {
            const response = await endpoint.get("/checkout/alldata");
            if(response.data.code === 1){
                
                //console.log(response.data)
                //setActivePage(Math.ceil(check.length / 6))
                const datas  = response.data.list.filter((item) => item.status ==="new" && item.notify === true);
                datas.sort((a,b) => {
                    return new Date(b["createDate"]) - new Date(a["createDate"]);
                })
                setListActive(datas);
                setActivePage(Math.ceil(datas.length / 6));
                setValue(0)
                setListOrders(response.data.list);
            }
            
        } catch (error) {
            console.error(error)
        }

    }

    if(CallApi){

        callOrder();

    }
   return () => {

        CallApi = false;
        setChkStatus(false);
    }

  },[chkStatus])

  const handleChangeVal = (event, newValue) => {
    //setNextPage(1);
    if(newValue === 0 ){
       
        check.sort((a,b) => {
             return new Date(b["createDate"]) - new Date(a["createDate"]);
        })
        
        setListActive(check);
        setActivePage(Math.ceil(check.length / 6))
    }
    else if(newValue === 1 ){
    
        waitShip.sort((a,b) => {
            return new Date(b["createDate"]) - new Date(a["createDate"]);
        })
        setListActive(waitShip);
        setActivePage(Math.ceil(waitShip.length / 6))
    }
    else if(newValue === 2 ){
    
        
        waittranfer.sort((a,b) => {
            return new Date(b["createDate"]) - new Date(a["createDate"]);
        })
        setListActive(waittranfer);
        setActivePage(Math.ceil(waittranfer.length / 6))
    }
    else if(newValue === 3 ){
    
        cancelOrder.sort((a,b) => {
            return new Date(b["createDate"]) - new Date(a["createDate"]);
        })
        setListActive(cancelOrder);
        setActivePage(Math.ceil(cancelOrder.length / 6))
    }
   
    setNextPage(1)
    setValue(newValue);
  };
  const changePage = (event , value) => {
    
        setNextPage(value)
  }

  const searchList = (e) => {
    setSearchOrder(e.target.value);
    let values = e.target.value;

    if(values !== ""){

        const filterData = listOrders.filter((order) => order.orderID.toLowerCase() === values.toLowerCase());

        filterData.map((data) => {
    
            data["page"] = 1;
    
            return data;
    
        })
        
        setSearchStatus(true)
        //console.log(filterData);
        setListActive(filterData)
        //setActivePage(1)
        //setNextPage(1)
        //setListActive(filterData)
        //console.log(filterData);
    }else{
        setSearchStatus(false)
        setChkStatus(true)

    }
   

  }
  return (<Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Typography variant='h5' sx={{color:"#000"}}>Orders</Typography>   
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField 
                        id="searchorder" 
                        label="ค้นหา" 
                        variant="filled" 
                        size="small" 
                        value={searchOrder}
                        onChange={searchList}
                        fullWidth />
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
                 {
                    !searchStatus ?
                   
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
                   
                    <Tab label="รอตรวจสอบ" sx={{fontSize:18}} icon={<Chip color="info" label={check.length} />} iconPosition="end" />
                    <Tab label="รอจัดส่ง" sx={{fontSize:18}} icon={<Chip color="primary" label={waitShip.length} />} iconPosition="end" /> 
                    <Tab label="ยังไม่ชำระเงิน" sx={{fontSize:18}} icon={<Chip color="default" label={waittranfer.length} />} iconPosition="end" />
                    <Tab label="ยกเลิก" sx={{fontSize:18}} icon={<Chip color="error" label={cancelOrder.length} />} iconPosition="end" />
                    
                    
            </Tabs>
            :null
            }
            </Box>    
            </Grid>
           {console.log(listActive)}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box
                    sx={{backgroundColor:"none",boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"
                    ,mt:2,
                    ml:1.2,
                    mr:1.2,}}
                >
                    {
                        listActive.length > 0 && searchStatus === false ?
                        listActive.map((itm , index) => {
                              
                                return value === 0 && itm.status ==="new" && itm.notify === true  ? <PanelOrdersNew key={index} indexs={index} items={itm} statusChk = {setChkStatus} nextpage={nextPage} /> 
                                        : value === 1 && itm.status ==="pending" && itm.payment === true  ? <PanelOrdersNew key={index} indexs={index} items={itm} statusChk = {setChkStatus} nextpage={nextPage} /> 
                                        : value === 2 && itm.status ==="new" && itm.notify === false ? <PanelOrdersNew key={index} indexs={index} items={itm} statusChk = {setChkStatus} nextpage={nextPage} />
                                        : value === 3 && itm.status ==="cancel" ? <PanelOrdersNew key={index} indexs={index} items={itm} statusChk = {setChkStatus} nextpage={nextPage} /> : null
                                        
                               })
                        :null
                    }
                </Box>
                {
                    searchStatus ? 
                    <Box
                    sx={{backgroundColor:"none",boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"
                    ,mt:2,
                    ml:1.2,
                    mr:1.2,}}
                >
                    {
                        listActive.length > 0 && searchStatus === true ?
                        listActive.map((itm , index) => {
                              
                                return <PanelOrdersNew key={index} indexs={index} items={itm} statusChk = {setChkStatus} nextpage={nextPage} /> 
                                        
                               })
                        :null
                    }
                    </Box>
                    :null
                }
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
          
            {
                activePage !== 0 ? 
                <Stack spacing={2} sx={{mt:1}} alignItems="center">
                    <Pagination count={activePage} page={nextPage} color="primary" onChange={changePage} />
                </Stack>
                : null
                
             }
            
            
        </Grid>   
        )
}

export default DashOrder