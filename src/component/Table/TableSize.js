import React , {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Table,  Typography, Grid , Box , Stack 
    , TextField , Button , TableBody , TableContainer 
    , TableHead , TableRow , Chip , IconButton
     }  from '@mui/material';
import {styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import DrafModal from '../Modal/DrafModal';
import endpoint from '../../api/endpoint';
import months from "../../data/dates.json"

const TableSize = () => {

    const [dataSearch , setDataSearch] = useState('');
    const [prvList , setPrvList] = useState([]);
    const [listData , setListData] = useState([]);
    let navicate = useNavigate();
    const [openDelSize , setOpenDelSize] = useState(false);
    const [statusCallApi , setStatusCallApi] = useState(false);
    const [pages , setPages] = useState(1);
    const [nextPage , setNextPage] = useState(1);
    const [delID , setDelID] = useState('');
    useEffect(() => {

        const reqData = async() => {

            const response = await endpoint.get("/sizeproduct");

            if(response.data.code === 1){

                //console.log(response.data.list);

                const reData = response.data.list.map((data , index) => {

                    const inpost = index+1;
                    const pos = Math.ceil(inpost / 5);
                    data["page"] = pos;
                    data["createdate"] = convertDate(data.createdate);

                    return data;
                 })

                setListData(reData)
                setPrvList(reData);
                const page = Math.ceil(response.data.list.length === 0 ? 1 : response.data.list.length / 5);
                setPages(page);
                setStatusCallApi(true)
                
            }
         }

        reqData();
     },[statusCallApi])

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
    const changePage = (event , value) => {

        //console.log(value)
        setNextPage(value)
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
            navicate("/backend/sizeproduct/add")
      }
      const handleEdit = (id) => {

            navicate(`/backend/sizeproduct/edit/${id}`)
      }

      const showModalDel = (id) => {

            setDelID(id)
            setOpenDelSize(true);
           
      }
      const confirmDel = async () => {

            setStatusCallApi(false);
            try {

                const response = await endpoint.delete(`/sizeproduct/${delID}`);
                
                if(response.data.code ===1){

                    setStatusCallApi(true)
                    setOpenDelSize(false);

                }
                
            } catch (error) {
                console.error(error)
            }
           
           
      }

      const changeSearch = (e) => {
         var val = e.target.value;
         setDataSearch(val)
         var newArr = [];
         if(val !== ""){

            for(const [key , value] of Object.entries(prvList))
            {
                if(value.id.toString().includes(val) || value.unitname.includes(val)){

                        const pos = parseInt(key) + 1;
                        const page = Math.ceil(pos/5);
                        value["page"] = page;
                        newArr.push(value)

                }
             }
             const pageall = Math.ceil(newArr.length / 5);
             setPages(pageall);
             setListData(newArr)
         }else{

            const page = Math.ceil(prvList.length / 5);
            setPages(page)
            setListData([...prvList]);

         }
    }
    return (<Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <Typography variant='h5' sx={{color:"#000"}}>เพิ่มความจุ (หน่วย) สินค้า</Typography>   
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={2}>
                            <Button variant='contained' color="info" onClick={handleClickOpen}><AddIcon/> เพิ่มข้อมูล</Button>
                        </Grid>
                        <Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2}}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField 
                                    id="namesize" 
                                    label="ข้อความ" 
                                    variant="filled" 
                                    size='small' 
                                    value={dataSearch}
                                    onChange={changeSearch}
                                    fullWidth/>
                            </Grid>
                            
                        </Grid>
                   
                    
                    <DrafModal open={openDelSize} setOpen={setOpenDelSize} txthead={"ยืนยันต้องการลบข้อมูลไหม ?"} handleConfirm={() => confirmDel()}>
                    <Typography>ลบข้อมูล</Typography>
                    </DrafModal>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{mt:2}}>
                    <Box sx={{backgroundColor:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d"}}>
                    <TableContainer>
                            <Table sx={{ minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                    <TableRow>
                                    <StyledTableCell>รหัสหน่วย</StyledTableCell>
                                    <StyledTableCell align="center">ชื่อหน่วยไทย</StyledTableCell>
                                    <StyledTableCell align="center">ชื่อหมวดหมู่ภาษาอังกฤษ</StyledTableCell>
                                    <StyledTableCell align="center">รายละเอียดหน่วย</StyledTableCell>
                                    <StyledTableCell align="center">สถานะ</StyledTableCell>
                                    <StyledTableCell align="center">วันที่ปรับปรุง</StyledTableCell>
                                    <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        statusCallApi ? 

                                        listData.length > 0 ?
                                                
                                            listData.map((data , index) => {
                                                return (data.page === nextPage) ?
                                                        <TableRow key={index}>
                                                                    <TableCell component="th" scope="row" >
                                                                            <Typography variant='p'>{data.id}</Typography>
                                                                    </TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Typography variant='p'>{data.unitname}</Typography></TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Typography variant='p'>{data.unitnameen}</Typography></TableCell>
                                                                    <TableCell component="th" scope="row" align="center">{data.unitdetail}</TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Chip label={data.status ? "เปิด" :"ปิด"}   color={data.status ? "info" :"error"} /></TableCell>
                                                                    <TableCell component="th" scope="row" align="center"><Typography variant='p'>{data.createdate}</Typography></TableCell>
                                                                    <TableCell component="th" scope="row" align="center">
                                                                        <IconButton aria-label="edit" onClick={() => handleEdit(data.id)} >
                                                                                <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton aria-label="del" onClick={() => showModalDel(data.id)}>
                                                                                <DeleteIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                        : null
                                                    })
                                                :  
                                                <TableRow>
                                                  
                                                <TableCell component="th" scope="row" >
                                                        <Typography variant='p'>ไม่มีข้อมูล</Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row" > </TableCell>
                                                <TableCell component="th" scope="row" > </TableCell>
                                                <TableCell component="th" scope="row" > </TableCell>
                                                <TableCell component="th" scope="row" > </TableCell>
                                                <TableCell component="th" scope="row" > </TableCell>
                                                <TableCell component="th" scope="row" > </TableCell>
                                                </TableRow>
                            
                                        :null
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

export default TableSize