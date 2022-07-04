import React , {useState , useContext , useEffect} from 'react';
import {Stack , Box ,InputLabel, MenuItem , Typography  , TextField , FormControl 
      , InputAdornment , Button , Select , Grid , Chip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import DataContext from '../../context/DataContext';
import PanelAddress from '../../component/BlockContentAddress/PanelAddress';
import endpoint from '../../api/endpoint';
import useAxiosPrivate from '../../hook/useAxiosPrivate';
import SweetAlertCustom from '../../component/SweetAlert/SweetAlertCustom';
import thaiprovinces from '../../data/kingdom/thai_province.json'
import thaiamphue from '../../data/kingdom/thai_amphures.json'
import thaitambon from '../../data/kingdom/thai_tambons.json'

const SecAddress = () => {

  const {userLogin , setUserLogin} = useContext(DataContext);

  const axiosPrivate = useAxiosPrivate();

  const [userAddress , setUserAddress] = useState([]);
  const [listDistinct , setListDistinct] = useState([]);
  const [listTambom , setListTambon] = useState([]);
  const [listZipcode , setListZipcode] = useState([]);

  
  const [nameAddr , setNameAddr] = useState('');
  const [telAddr , setTelAddr] = useState('');
  const [detailAddr , setDetailAddr] = useState('');
  const [provinces, setProvinces] = useState('');
  const [distinct , setDistinct] = useState('');
  const [tambon , setTambon] = useState('');
  const [postCode, setPostCode] = useState('');
  const [statusFrm , setStatusFrm] = useState(false);

  const [frmAddress , setfrmAddress] = useState({nameAddr:'', telAddr:'',provinceAddr:'',districtAddr:'' ,tambonAddr:'' , postcodeAddr:'' , detailAddr:''});

  const [frmEditAddr , setfrmEditAddr] = useState({});

  const [statusEdit , setStatusEdit] = useState(false);

  const [statusDel , setStatusDel] = useState(false);

  const [statusActive,setStatusActive] = useState(false);

  const handleChangeProvinces = (event , name) => {

    setProvinces('');
    setDistinct('');
    setTambon('');
    setPostCode('');
    setListDistinct([]);
    setListTambon([]);
    setListZipcode([]);

    //console.log(name.props.name)
    //setListDistinct([]);
    const fill_amphue = thaiamphue.RECORDS.filter((list) => list.province_id === event.target.value)
    //console.log(fill_amphue)
    //console.log(Object.keys(frmEditAddr).length)
    if(Object.keys(frmEditAddr).length > 0){
        setfrmEditAddr({...frmEditAddr  , provinceAddr : name.props.name})
        //console.log(name.props.name)
    }else{
        setfrmAddress({...frmAddress , provinceAddr: name.props.name})
    }
    
    setListDistinct(fill_amphue);
    setProvinces(event.target.value);
  };

  const [swalProps, setSwalProps] = useState({
    show: false,
    title: 'เพิ่มข้อมูลเสร็จสิ้น',
    text: '',
    icon:"success",
    showCancelButton: false,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
 });

  const clkProvice = (name) => {

    console.log(name)
  }

  const handdleChangedistinct = (event , name) => {

      if(Object.keys(frmEditAddr).length > 0){
       setfrmEditAddr({...frmEditAddr  , districtAddr : name.props.name})
      
      }else{
        setfrmAddress({...frmAddress , districtAddr: name.props.name})
      }
    
    const fill_tambon = thaitambon.RECORDS.filter((list) => list.amphure_id === event.target.value)
    setListTambon(fill_tambon);
    setDistinct(event.target.value)

  }

  const handdleChangetambon = (event , name) => {

    //console.log(event.target.value)
     if(Object.keys(frmEditAddr).length > 0){
      setfrmEditAddr({...frmEditAddr  , tambonAddr : name.props.name})
     
     }else{
        setfrmAddress({...frmAddress , tambonAddr: name.props.name})
     }
    const fill_tambon = listTambom.filter((list) => list.id === event.target.value)
    //console.log(fill_tambon)
    setListZipcode(fill_tambon)
    setTambon(event.target.value)

  }

  const handdlechangePostcode = (event) => {

     if(Object.keys(frmEditAddr).length > 0){
      setfrmEditAddr({...frmEditAddr  , postcodeAddr : event.target.value})
     
     }else{
        setfrmAddress({...frmAddress , postcodeAddr: event.target.value})
     }
    setPostCode(event.target.value)

  }

  const handdleSubmit = async (e) => {
      e.preventDefault();
      setStatusFrm(false);

      if(nameAddr && telAddr && Object.keys(frmEditAddr).length === 0){

        try {

          const response = await axiosPrivate.post("/insertaddress" , frmAddress);

          if(response.status === 200 && response.statusText === "OK"){

              setSwalProps({...swalProps , show:true});
              //console.log(response.data)
              setStatusFrm(true);
              if(response.data.code === 1){
                      setfrmAddress({nameAddr:'', telAddr:'',provinceAddr:'',districtAddr:'' ,tambonAddr:'' , postcodeAddr:'' , detailAddr:''});
                      setNameAddr('');
                      setTelAddr('');
                      setDetailAddr('');
                      setProvinces('');
                      setDistinct('');
                      setTambon('');
                      setPostCode('');
                      setListDistinct([]);
                      setListTambon([]);
                      setListZipcode([]);
                      
                      
              }
            
            

          }
          
          
        } catch (error) {
          
          console.error(error)

        }

      }
      else if(Object.keys(frmEditAddr).length  > 0){

            //console.log(frmEditAddr)
            try {

              
              const response = await axiosPrivate.post("/updateaddress" , frmEditAddr);
              if(response.status === 200 && response.statusText === "OK"){
    
                setSwalProps({...swalProps , show:true});

                if(response.data.code === 1){
                    
                    setNameAddr('');
                    setTelAddr('');
                    setDetailAddr('');
                    setProvinces('');
                    setDistinct('');
                    setTambon('');
                    setPostCode('');
                    setListDistinct([]);
                    setListTambon([]);
                    setListZipcode([]);
                    setfrmEditAddr({});
                    setStatusEdit(false);
                }
                
                
    
              }
              
            } catch (error) {
                console.error(error)
            }

      }
      else{
         alert("error");
      }
     

  }
  

  useEffect(() => {

    const fetchData = async () => {

      const response = await endpoint.get(`/getaddress/${userLogin.username}` , {withCredentials:true});
    
      console.log(response);
      if(response.statusText === "OK" && response.status === 200 && response.data.code === 1){
  
          //console.log(response.data)
          
          response.data.data.address.sort(function(a, b) {
            var keyA = a.active;
            //var keyB = b.active;
            
            if (keyA === true) return -1; // ขยับตำแหน่งขึ้นมา 1 ลำดับ
            if (keyA === false) return 1; // อยู่ที่เดิม
            return 0;
          });
          //console.log(response.data.data.address)
          setUserAddress(response.data.data.address);
          setStatusActive(false)
         

  
      }
      else if(response.data.code === 2){

          setUserAddress([]);

      }
      else if(response.data.code === 4){

          setUserLogin(null);

      }


    }

    fetchData();
 
    
   

  },[statusFrm , statusEdit , statusDel , statusActive])

  useEffect(() => {

    console.log("edit")
    if(Object.keys(frmEditAddr).length !== 0){

      const findPro = thaiprovinces.RECORDS.find((name) => name.name_th ===  frmEditAddr.provinceAddr); // ค้นหารหัสจังหวัด
      const findsProvicetoDin = thaiamphue.RECORDS.filter((data) => data.province_id ===  findPro.id); // นำรหัสจังหวัด มา filter ข้อมูล อำเภอ
      const findDisFromEdit = findsProvicetoDin.find((data) => data.name_th ===  frmEditAddr.districtAddr) // นำข้อมูล อำเภอ ที่ filter มา ค้นหา ข้อมูล อำเภอที่เลือก
      const findsDinToTam = thaitambon.RECORDS.filter((data) => data.amphure_id ===  findDisFromEdit.id) // นำข้อมูล อำเภอที่ filter มาหา ข้อมูลตำบล ทั้งหมด

      //console.log(findsDinToTam)
      setListDistinct(findsProvicetoDin);
      setListTambon(findsDinToTam);

      setNameAddr(frmEditAddr.nameAddr);
      setTelAddr(frmEditAddr.telAddr);
      setDetailAddr(frmEditAddr.detailAddr);
      setProvinces(findPro.id);
      
      //console.log(frmEditAddr.districtAddr)
      const findDin = findsProvicetoDin.find((name) => name.name_th ===  frmEditAddr.districtAddr); // นำข้อมุล อำเภอในจังหวัดที่เลือก มาเช็คข้อมูล Edit เพื่อ Active ใน select
      const findTam = findsDinToTam.find((val) => val.name_th ===  frmEditAddr.tambonAddr); // นำข้อมูล ตำบล ที่ค้นหาใน อำเภอที่เลือก มาเช็คข้อมูล Edit เพื่อ active ใน select
      //console.log(findTam)
      setDistinct(findDin.id);
      setTambon(findTam.id);
      setListZipcode([findTam]);
      setPostCode(findTam.zip_code);
     }
    
   },[statusEdit])

   const btnReset = () => {

      //console.log('btn-reset');
      setNameAddr('');
      setTelAddr('');
      setDetailAddr('');
      setProvinces('');
      setDistinct('');
      setTambon('');
      setPostCode('');
      setListDistinct([]);
      setListTambon([]);
      setListZipcode([]);
      setfrmAddress({nameAddr:'', telAddr:'',provinceAddr:'',districtAddr:'' ,tambonAddr:'' , postcodeAddr:'' , detailAddr:''});
      setfrmEditAddr({});

   }

  

  

  return (
         <>
         {
             userAddress.length > 0 ?

             <PanelAddress list={userAddress} setfrmEditAddr={setfrmEditAddr} setStatusEdit={setStatusEdit} setStatusDel={setStatusDel} setStatusActive={setStatusActive} />   
             : null
         }
         
         <Stack spacing={1} sx={{mt:5 , mb:5}}>
             <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
              <Typography variant='h4' sx={{pt:3,pl:3}}> {Object.keys(frmEditAddr).length > 0 ? "แก้ไขข้อมูลที่อยู่" : "ข้อมูลที่อยู่" }</Typography>
               <form onSubmit={handdleSubmit}>
                <Stack direction="row" spacing={3} sx={{p:3}}>
                
                        <TextField
                            label="ชื่อ-นามสกุล"
                            id="nameAddr"
                            InputProps={{
                                endAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                            }}
                            value={nameAddr}
                            onChange={(e) => {
                              
                              if(Object.keys(frmEditAddr).length > 0){
                              
                                setfrmEditAddr({...frmEditAddr  , nameAddr :e.target.value})
                               }else{
                                  setfrmAddress({...frmAddress , nameAddr: e.target.value})
                              }
                              setNameAddr(e.target.value)
                            }}
                            variant="outlined"
                            size="small"
                            fullWidth
                            />
                         <TextField
                            label="หมายเลขโทรศัพท์"
                            id="telAddr"
                            InputProps={{
                                endAdornment: <InputAdornment position="start"><PhoneEnabledIcon  /></InputAdornment>,
                            }}
                            value={telAddr}
                            onChange={(e) => {
                              if(Object.keys(frmEditAddr).length > 0){
                                  setfrmEditAddr({...frmEditAddr  , telAddr :e.target.value})
                              }else{
                                setfrmAddress({...frmAddress , telAddr: e.target.value})
                              }
                              setTelAddr(e.target.value)
                             
                            }}
                            variant="outlined"
                            size="small"
                            fullWidth
                                        />
                    
                </Stack>
                <Stack spacing={3} sx={{pl:3 , pr:3}} direction="row">

                    <FormControl size="small" fullWidth>
                                    <InputLabel id="labelprovinceAddr">จังหวัด</InputLabel>
                                    <Select
                                    labelId="lprovinceAddr"
                                    id="provinceAddr"
                                    value={provinces}
                                    label="จังหวัด"
                                    onChange={handleChangeProvinces}
                                    MenuProps={{style:{maxHeight:300} }}
                                   
                                    >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    {
                                      thaiprovinces.RECORDS.map((val , index) => {

                                          return <MenuItem key={index} value={val.id} name={val.name_th}>{val.name_th}</MenuItem>

                                      })
                                    }
                                    
                                    </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                                    <InputLabel id="labeldistrictAddr">เขต/อำเภอ</InputLabel>
                                    <Select
                                    labelId="ldistrictAddr"
                                    id="districtAddr"
                                    value={distinct}
                                    label="เขต/อำเภอ"
                                    onChange={handdleChangedistinct}
                                    MenuProps={{style:{maxHeight:300} }}
                                    maxRows={4}
                                    >
                                    <MenuItem value="">
                                    <em>{provinces === "" ? "กรุณาเลือก จังหวัด ก่อน" : "None" }</em>
                                    </MenuItem>
                                    {
                                        listDistinct.length > 0 ?
                                        listDistinct.map((val , index) => {

                                            return <MenuItem key={index} value={val.id} name={val.name_th}>{val.name_th}</MenuItem>

                                        })
                                        : null
                                    }
                                   
                                    </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={3} sx={{p:3}} direction="row">
                <FormControl size="small" fullWidth>
                                    <InputLabel id="labeltambon">ตำบล/แขวง</InputLabel>
                                    <Select
                                    labelId="ltambon"
                                    id="tambonaddr"
                                    value={tambon}
                                    label="ตำบล/แขวง"
                                    onChange={handdleChangetambon}
                                    MenuProps={{style:{maxHeight:300} }}
                                    maxRows={4}
                                    >
                                    <MenuItem value="">
                                    <em>{distinct === "" ? "กรุณาเลือก อำเภอ ก่อน" : "None" }</em>
                                    </MenuItem>
                                    {
                                        listTambom.length > 0 ?
                                        listTambom.map((val , index) => {

                                            return <MenuItem key={index} value={val.id} name={val.name_th}>{val.name_th}</MenuItem>

                                        })
                                        : null
                                    }
                                   
                                    </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                                    <InputLabel id="labelpostcodeAddr">รหัสไปรษณีย์</InputLabel>
                                    <Select
                                    labelId="lpostcodeAddr"
                                    id="postcodeAddr"
                                    value={postCode}
                                    label="รหัสไปรษณีย์"
                                    onChange={handdlechangePostcode}
                                    >
                                    <MenuItem value="">
                                    <em>{tambon === "" ? "กรุณาเลือก ตำบล ก่อน" : "None" }</em>
                                    </MenuItem>
                                    {
                                      
                                      listZipcode.length > 0 ?
                                      listZipcode.map((val , index) => {

                                          return <MenuItem key={index} value={val.zip_code}>{val.zip_code}</MenuItem>

                                      })
                                      : null
                                    }
                                    
                                    </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={3} sx={{pl:3 ,pr:3 , pb:3}}>

                <TextField
                        id="filled-multiline-static"
                        label="รายละเอียดที่อยู่"
                        multiline
                        value={detailAddr}
                        onChange={(e) => {
                          if(Object.keys(frmEditAddr).length > 0){
                              setfrmEditAddr({...frmEditAddr  , detailAddr :e.target.value})
                          }else{
                              setfrmAddress({...frmAddress , detailAddr: e.target.value})
                          }
                          setDetailAddr(e.target.value)
                          
                        }}
                        rows={4}
                       
                        />

                </Stack>
                
                <Button type="submit" variant="contained" sx={{ml:3 , mr:3 , mb:3 , backgroundColor:"#f48225"}}>ยืนยัน</Button>  
                <Button type="reset" variant="contained" color="error" sx={{ml:1 , mr:1 , mb:3}} onClick={btnReset}>รีเซ็ต</Button>
               
                </form>
              </Box>
              <SweetAlertCustom swalProps={swalProps} setSwalProps={setSwalProps} />
        </Stack>   
        </>
  )
}

export default SecAddress