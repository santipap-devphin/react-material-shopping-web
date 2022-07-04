import React , {Fragment , useState , useEffect , useContext} from 'react';
import {Stack , Box , Typography , Button  , Grid , Chip , Dialog ,DialogActions , DialogContent , DialogContentText , DialogTitle} from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SweetAlertCustom from '../SweetAlert/SweetAlertCustom';
import DataContext from '../../context/DataContext';
import endpoint from '../../api/endpoint';
const PanelAddress = ({list , setfrmEditAddr , setStatusEdit , setStatusDel , setStatusActive}) => {
  

  const {userLogin} = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeDialog, setActiveDialog] = useState(false);
  const [callDel , setCallDel] = useState(false);
  const [callConFirmActive , setCallConFirmActive]= useState(false);
  const [activeData , setActiveData] = useState('');
  const [delID , setDelID] = useState('');
  const [swalProps, setSwalProps] = useState({
    show: false,
    title: 'ลบข้อมูลเรียบร้อย',
    text: '',
    icon:"success",
    showCancelButton: false,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
   });
  
  const editAddress = (id) => {

    const findAddr = list.find((val) => val.addrID ===  id);

    setfrmEditAddr(findAddr);

    setStatusEdit(true);
    //console.log(findAddr)
    }

  const delAddress = (id) => {

        setCallDel(false);
        setOpenDialog(true);
        setDelID(id)

  }
  const handleClose = () => {
        setOpenDialog(false);
  };
  const closeActive = () => {
        setActiveDialog(false);
  }
  const confirmDel = () => {

        setOpenDialog(false);
        setCallDel(true)
        //call api del

  }
  const conFirmActive = () => {

    setCallConFirmActive(true)
    setActiveDialog(false);

  }

  const activeStatus = (id) => {

    setCallConFirmActive(false);
    setActiveDialog(true);
    setActiveData(id);
    //console.log("active" , id)

 }

  useEffect( async () => {
    
    if(callDel === true){

        //console.log(delID)
        try {

            const response = await endpoint.delete(`/deladdress/${delID}/${userLogin.username}`);
            if(response.status === 200 && response.statusText === "OK"){

                if(response.data.code === 1){

                        setStatusDel(true);
                        setTimeout(function() {setSwalProps({...swalProps ,show: true })}, 500);
                        setTimeout(function() { setStatusDel(false) }, 1000);
                 }

            }
            console.log(response)
            
        } catch (error) {
            console.error(error)
        }

        
    }
  },[callDel])

  useEffect( async() => {

    if(callConFirmActive === true){

         try {

            const response = await endpoint.post("/updateactiveaddr" , {username:userLogin.username,addrid:activeData});
            if(response.status === 200 && response.statusText === "OK"){

                if(response.data.code === 1){

                    setStatusActive(true);

                }

            }
            
             
         } catch (error) {
             console.error(error);
         }

            

    }
    


  },[callConFirmActive])


  

  return (
        <>
        {
            list.length > 0 ? 
            list.map((addr , index) => {

            return (<Fragment key={index}><Box sx={{backgroundColor:"#030f27", color:"#dfb163" , mt:5 , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)"}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Stack direction="row">
                                        <PushPinIcon sx={{p:1 , fontSize:32}} /> <Typography variant='h6' sx={{p:1}}>ข้อมูลที่อยู่</Typography>           
                                        {addr.active === true ? <Chip label="ค่าเริ่มต้น" color="info" sx={{mt:1}} /> : null}
                                    </Stack>
                                </Stack>
                            </Grid>
                         <Grid item xs={6}>
                            <Button variant="outlined" color="success" disabled={addr.active === true ? true : false}  sx={{mt:0.5}} onClick={() => activeStatus(addr.addrID)}>
                                <BookmarkAddedIcon />  ตั้งเป็นค่าเริ่มต้น
                            </Button>
                            <Button variant="outlined" color="warning"  sx={{mt:0.5 , ml:1}} onClick={() => editAddress(addr.addrID)}>
                              <EditIcon /> แก้ไข
                            </Button>
                            <Button variant="outlined" disabled={addr.active === true ? true : false} sx={{mt:0.5 , ml:1}} onClick={() => delAddress(addr.addrID) }>
                               <DeleteIcon /> ลบ
                            </Button>
                        </Grid>
                         
                         </Grid>
                        </Box>
                        <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
                            <Grid container>
                                    <Grid item xs={6} textAlign="center">
                                        <Typography>ชื่อ-นามสกุล</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{addr.nameAddr} </Typography>
                                    </Grid>
                            </Grid>
                            <Grid container>
                                    <Grid item xs={6} textAlign="center">
                                        <Typography>โทรศัพท์</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{addr.telAddr}</Typography>
                                    </Grid>
                            </Grid>
                            <Grid container>
                                    <Grid item xs={6} textAlign="center">
                                        <Typography>ที่อยู่</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{addr.detailAddr}</Typography>
                                        <Typography>  </Typography>
                                    </Grid>
                            </Grid>
                            <Grid container>
                                    <Grid item xs={6} textAlign="center">
                                        <Typography>จังหวัด / อำเภอ / ตำบล / รหัสไปรษณีย์</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{addr.provinceAddr} / {addr.districtAddr} / {addr.tambonAddr} / {addr.postcodeAddr}</Typography>
                                        <Typography>  </Typography>
                                    </Grid>
                            </Grid>
                             </Box></Fragment>)
                         })

            : 
            null
        }
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"ยืนยันต้องการลบข้อมูลหรือไม่ ?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    หากต้องการให้กดปุ่ม ยืนยัน
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>ยกเลิก</Button>
                <Button onClick={confirmDel} autoFocus>
                        ยืนยัน
                </Button>
                </DialogActions>
            </Dialog> 
            <Dialog
                open={activeDialog}
                onClose={closeActive}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"ต้องการตั้งค่า ที่อยู่นี้ให้เป็น ปัจจุบันหรือไม่ ?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    หากใช่ ให้กด ปุ่มยืนยัน
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={closeActive}>ยกเลิก</Button>
                <Button onClick={conFirmActive} autoFocus>
                        ยืนยัน
                </Button>
                </DialogActions>
            </Dialog> 
            <SweetAlertCustom swalProps={swalProps} setSwalProps={setSwalProps}/>
        </>
  )
}

export default PanelAddress