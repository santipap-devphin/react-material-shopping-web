import React , {useState , useEffect} from 'react';
import {Table,  Typography, Grid , Box , Stack 
    , TextField , Button , TableBody
    , TableContainer , TableHead , TableRow
    , Chip , IconButton 
     }  from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import DrafModal from '../Modal/DrafModal';
import endpoint from '../../api/endpoint';
import months from '../../data/dates.json'

const TableCategory = () => {
    const [openEdit , setOpenEdit] = useState(false);
    const [openDel , setOpenDel] = useState(false);
    const [categoryList , setCategoryList] = useState([]);
    const [prvCategoryList , setPrvCategoryList] = useState([]);
    const [statusCallApi , setStatusCallApi] = useState(false); 
    const [dataSearch , setDataSearch] = useState('');
    const [delID , setDelID] = useState();
    const [pages , setPages] = useState(1)
    const [nextPage , setNextPage] = useState(1);
    const convertDate = (data) => {
        //console.log(data)
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
    useEffect(() => {

        const getData = async () => {
    
           
            try {
                const response = await endpoint.get("/getcategory");
                const pages = Math.ceil(response.data.length / 5);
    
                 const addPage = response.data.map((remap , index) => {
    
                    const pos = index+1;
                    const page = Math.ceil(pos / 5);
                   //console.log(remap.createdate)
                    remap["createdate"] = convertDate(remap.createdate);
                    remap["page"] = page;
                    
                    return remap;
    
    
                })
    
                //console.log(addPage)
                setPages(pages)
                setCategoryList(addPage);
                setPrvCategoryList(addPage)
                setStatusCallApi(true)
                //console.log(response)
                
            } catch (error) {
                console.error(error);
                
            }
    
        }
    
        getData();
    
        },[statusCallApi])

    let navicate = useNavigate();

    const changePage = (event , value) => {

        setNextPage(parseInt(value))
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
           
            navicate("/backend/category/add")
    }
    const handleConfirm = ()=> {

        alert("confirmedit");
        setOpenEdit(false);
  }
    const showModalDel = (id) => {

        setDelID(id)
        setOpenDel(true);
   }
   const confirmDel = async () => {

    setStatusCallApi(false);
    //console.log("delete" , delID);

    try {

        const response = await endpoint.get(`/delcategory/${delID}`)

        if(response.data.code === 1){

            setCategoryList([response.data.list]);
            setStatusCallApi(true);
        }

        console.log(response.data)

        
    } catch (err) {
        console.error(err)
    }
    
    setOpenDel(false);
}
const changeSearch = (e) => {

    setDataSearch(e.target.value);
    var val = e.target.value;
   
    var newArr = [];
    if(val !== ""){

        for(const[key , value] of Object.entries(prvCategoryList)){

                if(value.id.toString().includes(val) || value.catename.includes(val)){

                        const pos = parseInt(key)+1;
                        const page = Math.ceil(pos / 5);
                        value["page"] = page;
                        newArr.push(value);

                }

        }
        var sumPageNew = Math.ceil(newArr.length / 5);
        setPages(sumPageNew)
        setCategoryList(newArr);
    }else{
        
        const pages = Math.ceil(prvCategoryList.length / 5);
        setPages(pages)
        //console.log(prvCategoryList);
        setCategoryList([...prvCategoryList]);
    }

  }

  return (<Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
            <Grid item xs={12} sm={12} md={12} lg={2}>
                <Typography variant='h5' sx={{color:"#000"}}>เพิ่มหมวดหมู่สินค้า</Typography>   
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
                <Button variant='contained' color="info" onClick={handleClickOpen}><AddIcon/> เพิ่มข้อมูล</Button>
            </Grid>
            <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
            
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField id="filled-basic" 
                    label="ข้อความ" 
                    variant="filled" 
                    size='small' 
                    value={dataSearch}
                    onChange={changeSearch}
                    fullWidth/>
                </Grid>
            
            </Grid>

            <DrafModal open={openEdit} setOpen={setOpenEdit} txthead={"แก้ไขหมวดหมู่"} handleConfirm={() => handleConfirm()}>
            <Typography>แก้ไข</Typography>
            </DrafModal>
            <DrafModal open={openDel} setOpen={setOpenDel} txthead={"ยืนยันต้องการลบข้อมูลไหม ?"} handleConfirm={() => confirmDel()}>
            <Typography>ลบข้อมูล</Typography>
            </DrafModal>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{mt:2}}>
            <Box sx={{backgroundColor:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"}}>
            <TableContainer>
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                            <TableRow>
                            <StyledTableCell>รหัสหมวดหมู่</StyledTableCell>
                            <StyledTableCell align="center">รูป</StyledTableCell>
                            <StyledTableCell align="center">ชื่อหมวดหมู่ไทย</StyledTableCell>
                            <StyledTableCell align="center">ชื่อหมวดหมู่ภาษาอังกฤษ</StyledTableCell>
                            <StyledTableCell align="center">รายละเอียด</StyledTableCell>
                            <StyledTableCell align="center">สถานะ</StyledTableCell>
                            <StyledTableCell align="center">วันที่ปรับปรุง</StyledTableCell>
                            <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                statusCallApi === true ? 
                                categoryList.length > 0 ?
                                categoryList.map((data , index) => {

                                return (data.page === nextPage) ?
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row" >
                                                        <Typography variant='p'>{data.id}</Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" sx={{maxWidth:100}}>
                                                    <img src={`http://localhost:7000/${data.imgfile}`} style={{borderRadius: "50%" , margin:2 , width:"40%"}} alt={`img-${index}`}></img>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>{data.catename}</Typography></TableCell>
                                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>{data.catenameen}</Typography></TableCell>
                                                <TableCell component="th" scope="row" align="center">{data.catedetail}</TableCell>
                                                <TableCell component="th" scope="row" align="center"><Chip label={data.status ? "เปิด" : "ปิด"} color={data.status ? "info" : "error"} /></TableCell>
                                                <TableCell component="th" scope="row" align="center"><Typography variant='p'>{/*data.createDate.replace("_" ," ")*/ data.createdate}</Typography></TableCell>
                                                <TableCell component="th" scope="row" align="center">
                                                        <IconButton aria-label="edit" onClick={() => navicate(`/backend/category/edit/${data.id}`)} >
                                                                <EditIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="del" onClick={() => showModalDel(data.id)}>
                                                                <DeleteIcon />
                                                        </IconButton>
                                                </TableCell>
                                            </TableRow>
                                    : null
                                })

                                :<TableRow>
                                    <TableCell component="th" scope="row" >
                                            <Typography variant='p'>ไม่มีข้อมูล</Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                    <TableCell component="th" scope="row" > </TableCell>
                                </TableRow>
                                
                                : 
                                <TableRow>
                                    <TableCell component="th" scope="row" >
                                            <Typography variant='p'>1</Typography>
                                    </TableCell>
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

export default TableCategory