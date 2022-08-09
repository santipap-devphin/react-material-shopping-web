import React , {useState , useEffect} from 'react';
import {Table,  Typography, Grid , Box , Stack 
    , TextField , Button , TableBody , TableContainer , TableHead , TableRow
    , Chip , IconButton , Switch , FormControlLabel , FormGroup 
     }  from '@mui/material';
import {styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import DrafModal from '../Modal/DrafModal';
import endpoint from '../../api/endpoint';
import months from "../../data/dates.json"
import DrafDialog from '../Dialog/DrafDialog';

const TableTags = () => {

  const [openEditTag , setOpenEditTag] = useState(false);
  const [openDelTag , setOpenDelTag] = useState(false);
  const [openModal , setOpenModal] = useState(false);
  const [tagsAdd , setTagsAdd] = useState('');
  const [tagsStatusAdd , setTagsStatusAdd] = useState(true);
  const [tagsEdit , setTagsEdit] = useState('');
  const [tagsID , setTagsID] = useState('');
  const [tagsStatusEdit , setTagsStatusEdit] = useState(true);
  const [valid , setValid] = useState(false);
  const [statusCallApi , setStatusCallApi] = useState(false);
  const [listTags , setListTags] = useState([]);
  const [prvListTags , setPrvListTags]= useState([]);
  const [pages , setPages] = useState(1);
  const [prvPage  , setPrvPage] = useState(1);
  const [searchData ,setSearchData] = useState('');

  const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
   });

   useEffect(() => {

     const callApi =  async () => {

            try {
                const response = await endpoint.get("/tags");
                if(response.data.code === 1){

                    const reData = response.data.list.map((data , index) => {

                        const indexs = index+1;
                        const pagePer = Math.ceil(indexs/5);
                        data["page"] = pagePer;
                        return data;


                    })
                    const pageAll = Math.ceil(reData.length / 5);
                    setPages(pageAll);
                    setListTags(reData);
                    setPrvListTags(reData)
                    setStatusCallApi(true)

                }
                
            } catch (error) {
                console.error(error);

            }

     }

     callApi();


   },[statusCallApi])

   const changePage = (event , value) => {

      setPrvPage(value);
      console.log(value)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#030f27",
        color: "#dfb163",
        padding:"10px",
        fontSize: 16,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        backgroundColor: "#f5f5f5",
      },
    }));

    const handleClickOpen = ()=> {
          //console.log("inin")
          setOpenModal(true)
    }

    const handleConfirm = async () => {

            setStatusCallApi(false);
            if(tagsEdit !== ""){

                try {
                    const response = await endpoint.put("/tags" , {id:tagsID , tagname:tagsEdit , status:tagsStatusEdit});
                    if(response.data.code === 1){

                        setStatusCallApi(true);
                    }
                    
                } catch (error) {
                    console.error(error);
                }

            }else{

                setValid(true);
                setTimeout(function() {setValid(false); }, 3500);

            }
          
          setOpenEditTag(false);
    }
    const handleEdit = async (id) => {

          const finds =  listTags.find((data) => data.id === parseInt(id))
          setTagsEdit(finds.tagname)
          setTagsID(id);
          setTagsStatusEdit(finds.status);
          setOpenEditTag(true);

    }
    const showModalDel = (id) => {

          setTagsID(id);
          setOpenDelTag(true);
    }
    const confirmDel = async() => {

         setStatusCallApi(false);
          try {
            const response = await endpoint.delete(`/tags/${tagsID}`);
            if(response.data.code === 1){

                setStatusCallApi(true);

            }
            
          } catch (error) {
            
          }
          setOpenDelTag(false);
    }

    const confirmAddTags = async() => {

         if(tagsAdd !== ""){

                setStatusCallApi(false)

                try {
                    const response = await endpoint.post("/tags" , {tagname:tagsAdd , status:tagsStatusAdd});
                    if(response.data.code === 1){

                        setTagsAdd('');
                        setStatusCallApi(true);

                    }

                    
                } catch (error) {
                    console.error(error);
                }


         }else{

            setValid(true);
            setTimeout(function() {setValid(false); }, 3500);


         }

          
          setOpenModal(false)
    }

    const changeTagsAdd = () => {

        setTagsStatusAdd(!tagsStatusAdd)

    }
    const changeTagsEdit= () => {

        setTagsStatusEdit(!tagsStatusEdit)

    }
    const chageTagsAdd = (event) => {
        event.preventDefault();
        setTagsAdd(event.target.value)
    }
    const convertDate = (data) => {

        let newdate;
        let newData;
        //console.log(data)
        if(data.indexOf("_") > -1){
            
            newdate = data.split("_");
            var date = newdate[0];
            var time = newdate[1];

            var redateyear =  date[0]+date[1]+date[2]+date[3];
            var redatemonth =  date[4]+date[5];
            var redateday =  date[6]+date[7];

            newData = redateday +" "+ months[parseInt(redatemonth)-1].nameshort +" "+ redateyear + " "+time;
            //console.log(newData)
         }

        return newData;
    }
    const changeData = (e) => {
        var val = e.target.value
        setSearchData(val);
        var newArr = [];
        if(val !== ""){

            for(const [key ,value] of Object.entries(prvListTags)){

                if(value.id.toString().includes(val) || value.tagname.includes(val)){

                    const pos = parseInt(key)+1;
                    const page = Math.ceil(pos / 5);
                    value["page"] = page;
                    newArr.push(value)
                }

            }
             const pageAll = Math.ceil(newArr.length / 5);  
             setPages(pageAll);
             setListTags(newArr);

        }else{

            const pageAll = Math.ceil(prvListTags.length / 5);
            setPages(pageAll);
            setListTags(prvListTags);
        }
     }
    
return (<Grid container sx={{mt:1 , ml:0.2 , mr:1.2}}>
                      <Grid item xs={12} sm={12} md={12} lg={1}>
                          <Typography variant='h5' sx={{color:"#000"}}>เพิ่ม Tag</Typography>   
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={2}>
                          <Button variant='contained' color="info" onClick={handleClickOpen}><AddIcon/> เพิ่มข้อมูล</Button>
                      </Grid>
                      <Grid container sx={{mt:1 , ml:1 , mr:0.2}}>
                         
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                              <TextField 
                                id="searchdata" 
                                label="ข้อความ" 
                                variant="filled" 
                                size='small' 
                                value={searchData}
                                onChange={changeData}
                                fullWidth/>
                          </Grid>
                          
                      </Grid>

                  <DrafDialog open={openModal} setOpen={setOpenModal} title={"เพิ่ม Tags"}  confirm={() => confirmAddTags()}>

                                     <TextField 
                                            id="tagname"
                                            label="ชื่อแท๊ก" 
                                            variant="filled" 
                                            size="small" 
                                            value={tagsAdd}
                                            onChange={chageTagsAdd}
                                            fullWidth/>
                                            {
                                                valid ? <Alert severity="error" variant="outlined">กรุณากรอกข้อมูล</Alert> : null
                                            }
                                     <FormGroup>
                                        <FormControlLabel control={<Switch checked={tagsStatusAdd} onChange={changeTagsAdd} />} label="สถานะ" />
                                    </FormGroup>                      
                   </DrafDialog>

                  <DrafDialog open={openEditTag} setOpen={setOpenEditTag} title={"แก้ไข Tags"}  confirm={() => handleConfirm()}>
                                <TextField 
                                        id="tagedit" 
                                        label="ชื่อแท๊ก" 
                                        variant="filled" 
                                        size="small" 
                                        value={tagsEdit}
                                        onChange={(e) => setTagsEdit(e.target.value) }
                                        fullWidth/>
                                        {
                                            valid ? <Alert severity="error" variant="outlined" sx={{mt:2}}>กรุณากรอกข้อมูล</Alert> : null
                                        }
                           
                           
                                <FormGroup>
                                    <FormControlLabel control={<Switch checked={tagsStatusEdit} onChange={changeTagsEdit} />} label="สถานะ" />
                                </FormGroup>                      
                 </DrafDialog>
                  <DrafModal open={openDelTag} setOpen={setOpenDelTag} txthead={"ยืนยันต้องการลบข้อมูลไหม ?"} handleConfirm={() => confirmDel()}>
                  <Typography>ลบข้อมูล</Typography>
                  </DrafModal>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{mt:2 , ml:1 , mr:0.2}}>
                  <Box sx={{backgroundColor:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"}}>
                  <TableContainer>
                          <Table sx={{ minWidth: 650}} aria-label="simple table">
                          <TableHead>
                                  <TableRow>
                                  <StyledTableCell>รหัสแท๊ก</StyledTableCell>
                                  <StyledTableCell align="center">ชื่อแท๊ก</StyledTableCell>
                                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                                  <StyledTableCell align="center">วันที่ปรับปรุง</StyledTableCell>
                                  <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                 {
                                    statusCallApi ? 
                                        listTags.length > 0 ? 
                                            listTags.map((data , index) => {
                                                return (data.page === prvPage) ?
                                                                <TableRow key={index}>
                                                                    <TableCell component="th" scope="row" >
                                                                            <Typography variant='p'>{data.id}</Typography>
                                                                    </TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Typography variant='p'>{data.tagname}</Typography></TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Chip label={data.status ? "เปิด" : "ปิด"} color={data.status ? "info" : "error"} /></TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Typography variant='p'>{convertDate(data.createdate)}</Typography></TableCell>
                                                                    <TableCell component="th" scope="row" align="center">
                                                                        <IconButton aria-label="edit" onClick={() => handleEdit(data.id)} >
                                                                                <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton aria-label="del" onClick={() => showModalDel(data.id)}>
                                                                                <DeleteIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                                :null
                                                

                                            })
                                            :<TableRow>
                                                <TableCell component="th" scope="row" >
                                                        <Typography variant='p'>ไม่มีข้อมูล</Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row" ></TableCell>
                                                <TableCell component="th" scope="row" ></TableCell>
                                                <TableCell component="th" scope="row" ></TableCell>
                                                <TableCell component="th" scope="row" ></TableCell>
                                            </TableRow>
                                    : 
                                    <TableRow>
                                        <TableCell component="th" scope="row" >
                                                <Typography variant='p'>กรุณารอสักครู่ ......</Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row" ></TableCell>
                                        <TableCell component="th" scope="row" ></TableCell>
                                        <TableCell component="th" scope="row" ></TableCell>
                                        <TableCell component="th" scope="row" ></TableCell>
                                    </TableRow>
                                 }
                                  
                              
                              
                              </TableBody>
                          </Table>
                      </TableContainer>
                      <Stack spacing={2} sx={{p:1}} alignItems="center">
                          <Pagination count={pages} color="primary" onChange={changePage} />
                      
                      </Stack>
                  </Box> 
                  </Grid>
                  </Grid>
 )
}

export default TableTags