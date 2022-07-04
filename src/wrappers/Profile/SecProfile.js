import React , {useState , useEffect , useContext} from 'react';
import {Stack , Box ,InputLabel, MenuItem , Typography  , TextField  , Radio , RadioGroup , FormControlLabel , FormControl , FormLabel
      , InputAdornment , Button , Select , Skeleton , Alert} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DataContext from '../../context/DataContext';
import endpoint from '../../api/endpoint';
import useAxiosPrivate from '../../hook/useAxiosPrivate';
import SweetAlertCustom from '../../component/SweetAlert/SweetAlertCustom';

const SecProfile = () => {

  const [days, setDays] = useState('');
  const [months, setMonths] = useState('');
  const [years, setYears] = useState('');
  
  const {userLogin} = useContext(DataContext);

  const [swalProps, setSwalProps] = useState({
      show: false,
      title: 'ระบบเกิดเหตุขัดข้อง',
      text: 'กรุณา Login ใหม่ หรือ ลองส่งข้อมูลอีกครั้ง',
      icon:"warning",
      showCancelButton: true,
      confirmButtonText:"OK",
      cancelButtonText:"Cancel"
   });

  //const {auth} = useAuth(); 


  const [userProfile , setUserProfile] = useState({});

  const [loadProfile , setLoadProfile] = useState(false);

  const [statusEdit , setStatusEdit] = useState(false);

  const [radioVal , setRadioVal] = useState('');

  const axiosPrivate = useAxiosPrivate();

  const handleChangeDay = (event) => {
      setDays(event.target.value);
    };
    const handleChangeMonths = (event) => {
      setMonths(event.target.value);
    };
    const handleChangeYears = (event) => {
      setYears(event.target.value);
    };

 const radioChange = (e) => {

      //console.log("inin");
      setRadioVal(e.target.value)

      userProfile.pfGender = e.target.value;
}

 const profileSubmit = async (e) => {

      e.preventDefault();

      const newDate = days + "/" + months + "/" + years;

      userProfile.pfBirth = newDate;

      if(userProfile){

            console.log(userProfile)
            const response = await axiosPrivate.post("/updateprofile" , userProfile);
            console.log(response.status);
            if(response.status === 200 && response.statusText === "OK"){

                 // setSwalProps({...swalProps , show:true})
                 setStatusEdit(true)

                 setTimeout(function() {setStatusEdit(false)}, 2000);


            }
            else if(response.status === 403){
                  setSwalProps({...swalProps , show:true})
                 
            }else{
                  setSwalProps({...swalProps , show:true})
                 
            }
            

      }
      

      //setUserProfile({...userProfile , frmUserProfile})

      //console.log(userProfile)


 }
    

    useEffect(() => {

      let newObj = userLogin.username;

      async function fetchprofile(newObj) {

                  try {

                        const response = await endpoint.get(`/getaddress/${newObj}` ,
                        {
                              /*headers: {
                                'Authorization': `Bearer ${auth}` 
                              },*/
                              withCredentials:true
                             
                        }
                        );
      
                        if(response.statusText === "OK" && response.status === 200 && response.data.code === 1){
                  
                        console.log(response)
                        setUserProfile(response.data.data.profile);
                        setLoadProfile(true);
                        if(response.data.data.profile.pfBirth !== null){

                              var spDate = response.data.data.profile.pfBirth.split("/");
                              setDays(spDate[0]);
                              setMonths(spDate[1]);
                              setYears(spDate[2]);

                        }
                        }else if(response.data.code === 2){
                              setLoadProfile(true)
                        }
                        
                  } catch (error) {
                        console.error(error)
                        
                  }
            
                  


      }
      fetchprofile(newObj);
    
      
  
    },[])

  return (
        <Stack spacing={1} sx={{mt:5 , mb:5}}>
               {
                     statusEdit ? <Alert severity="success">แก้ไขข้อมูลเสร็จสิ้น</Alert> : null
               }
              
              <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
              <Typography variant='h4' sx={{pt:3,pl:3}}>รายละเอียดสมาชิก</Typography>
              <Stack spacing={1} sx={{pl:3}}>
              <Typography variant='h6'> ชื่อผู้ใช้ santipap_korkai</Typography>
            
              
              </Stack>
              {
                    loadProfile ? 

                  
              <>
              <form onSubmit={profileSubmit}>
              <Stack direction="row" spacing={3} sx={{p:3}}>
                                    
                                        <TextField
                                            label="ชื่อ"
                                            id="searchshop"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            defaultValue={Object.keys(userProfile).length !== 0 ? userProfile.nameSurname : null}
                                            onChange={(e) => setUserProfile({...userProfile , nameSurname: e.target.value})}
                                            required
                                            fullWidth
                                        />
                                        <TextField
                                            label="อีเมล์"
                                            id="email"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><MarkunreadIcon  /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            defaultValue={Object.keys(userProfile).length !== 0 ? userProfile.pfEmail : null}
                                            onChange={(e) => setUserProfile({...userProfile , pfEmail: e.target.value })}
                                            size="small"
                                            required
                                            fullWidth
                                        />

              </Stack>
              <Stack spacing={3} sx={{pl:3, pr:3}}>
                                    
                                        <TextField
                                            label="หมายเลขโทรศัพท์"
                                            id="searchshop"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            defaultValue={Object.keys(userProfile).length !== 0 ? userProfile.pfPhone : null}
                                            onChange={(e) => setUserProfile({...userProfile , pfPhone: e.target.value })}
                                            required
                                            fullWidth
                                        />
                                         <FormControl>
                                          <FormLabel id="demo-radio-buttons-group-label">เพศ</FormLabel>
                                          <RadioGroup
                                          aria-labelledby="demo-radio-buttons-group-label"
                                          value={Object.keys(userProfile).length !== 0 ? userProfile.pfGender : "male"}
                                          onChange={radioChange}
                                          name="radio-buttons-group"
                                          >
                                          <FormControlLabel value="male" control={<Radio />} label="ชาย" />
                                          <FormControlLabel value="female" control={<Radio />} label="หญิง" />
                                          <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
                                          </RadioGroup>
                                    </FormControl>
                                        
              </Stack>
              <Stack spacing={1} sx={{pl:3 , pr:3}}>
              <Typography variant='h6'> วัน / เดือน / ปีเกิด</Typography>

                        <Stack direction="row" spacing={3}>
                              

                              <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-select-small">วัน</InputLabel>
                                    <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={days}
                                    label="days"
                                    onChange={handleChangeDay}
                                    >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"01"}>1</MenuItem>
                                    <MenuItem value={"02"}>2</MenuItem>
                                    <MenuItem value={"03"}>3</MenuItem>
                                    </Select>
                              </FormControl>
                              <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-select-small">เดือน</InputLabel>
                                    <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={months}
                                    label="days"
                                    onChange={handleChangeMonths}
                                   >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"01"}>มกราคม</MenuItem>
                                    <MenuItem value={"02"}>กุมภาพันธ์</MenuItem>
                                    <MenuItem value={"03"}>มีนาคม</MenuItem>
                                    </Select>
                              </FormControl>
                              <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-select-small">ปี </InputLabel>
                                    <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={years}
                                    label="days"
                                    onChange={handleChangeYears}
                                    >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"2530"}>2530</MenuItem>
                                    <MenuItem value={"2531"}>2531</MenuItem>
                                    <MenuItem value={"2532"}>2532</MenuItem>
                                    </Select>
                              </FormControl>

                        </Stack>
               </Stack>
               <Button type="submit" variant="contained" sx={{m:3 , backgroundColor:"#f48225"}}>ยืนยัน</Button>
               </form>
               </>
               :
               <>
               <Skeleton animation="wave" /> 
               <Skeleton animation="wave" /> 
               <Skeleton animation="wave" /> 
               <Skeleton animation="wave" /> 
               <Skeleton animation="wave" /> 
               </> 
             }
             </Box>
         <SweetAlertCustom swalProps={swalProps} setSwalProps={setSwalProps} />
        </Stack>
  )
}

export default SecProfile