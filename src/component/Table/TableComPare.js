import React , {useState , useEffect} from 'react';
import styled  from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const TableComPare = ({listCompare , setListCompare}) => {

    /*const [value, setValue] = useState(2);

    const [rowObj , setRowObj] = useState({ rowAction:[] ,
                                            rowProduct:[],
                                            rowPrice:[],
                                            rowDes:[],
                                            rowRating:[]});*/

     const Alert = React.forwardRef(function Alert(props, ref) {
          return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
     });

    const [openAlert, setOpenAlert] = useState(false);

    const [statuss, setStatuss] = useState(null);

    const [textMsg, settextMsg] = useState('');

    const [loadCom , setLoadCom] = useState(false);

    const ScreenTh = useMediaQuery('(max-width:767px)');

    const CustomTable = styled.table`
    &&& {
            
            table {
                border-collapse: collapse;
                border: 0.1px solid rgb(200, 200, 200);
                letter-spacing: 0px;
                font-size: 1rem;
                
                
                
            }
           
            td {
                    border: 1px solid #dee2e6;
                    border-left: 0px;
                    border-top: 0px;
                    padding: 5px;
                    min-width: ${ScreenTh ? "150px":"292px"};
                
            }
            th {
                
                border: 1px solid #dee2e6;
                border-left: 0px;
                border-bottom: 0px;
                padding: 10px;
                min-width: ${ScreenTh ? "150px":"292px"};
            }

            td {
                text-align: center;
                
            }

            tr:nth-child(even) {
                background-color: #eee;
            }
           th[scope="col"] {
                
                
                border-color: #e7e7e7;
                color: #000;
            }

            th[scope="row"] {
               
                font-size:20px;
                background-color: #e6e6e6;
                color:#262626;
            }

            caption {
                padding: 10px;
                caption-side: bottom;
            }

            
        }
    `;
  
    const onClickitem = (id) => {

        setLoadCom(false)

        const compareAction = listCompare.filter((items) => items.prdId !== id);

        setListCompare(compareAction);

        setOpenAlert(true);  
        setStatuss('error');
        settextMsg(`คุณลบข้อมูล สินค้า ในตารางเปรียบเทียบ เสร็จสิ้น`);

        setLoadCom(true)
    }

    useEffect(() => {

        //if(listCompare.length > 0)
        setLoadCom(true)

    },[])
    const handleClose = () => {

        setOpenAlert(false)
    }

  return (  <Box sx={ ScreenTh ? { flexGrow: 1 , m:2 , backgroundColor:"#fff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" } : { flexGrow: 1 , m:10 , backgroundColor:"#fff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" }}>
            {
                loadCom ? 
                <Grid container gutter={24} justify='center' style={{overflowX: "auto"}}>
                        <Grid item xs={12} style={{overflow: 'auto'}}>
                        <CustomTable id={0} key={0} style={{borderSpacing: 0}}>
                         
                         <thead>
                            <tr>
                                <th scope="row">แอคชั่น</th>
                                {
                                     listCompare !== null &&  listCompare.length !==0 ? 

                                        listCompare.map((item , index) => {

                                            return (<th scope="col" key={`col${index}`}>
                                                        <IconButton
                                                        size="large"
                                                        edge="end"
                                                        aria-label={`colof${index}`}
                                                        aria-controls={"tableCompare"}
                                                        aria-haspopup="true"
                                                        onClick={()=> onClickitem(item.prdId)}
                                                        color="inherit"
                                                        >
                                                             <DeleteIcon />
                                                        </IconButton>
                                                        </th>)

                                        })

                                    : <th scope="row">ไม่มีข้อมูล</th>
                                }
                               </tr>

                        </thead>
                        <tbody>

                               
                                <tr>
                                    <th scope="row">ชื่อสินค้า</th>
                                    {
                                        listCompare !== null &&  listCompare.length !==0 ? 

                                        listCompare.map((item ,index) => {

                                            return (<td key={`Product${index}`} style={{color:"#252531"}}><img src={item.prdImage} style={ScreenTh ? {width:"150px"} : {width:"292px"}} alt={`รูปภาพสินค้า ${index}`} /> <p>{item.prdTitle}</p></td>)

                                        })

                                    : <th scope="row"></th>
                                    }
                                   
                                </tr>
                                <tr>
                                    <th scope="row">ราคา</th>
                                    {
                                        listCompare !== null &&  listCompare.length !==0 ? 
                                        listCompare.map((price , index) => {

                                            return (<td key={index} style={{backgroundColor:"#f5f0e0"}}><span style={{color:"#EF6C33" ,fontSize:24}}>{price.prdPriceLast}</span><span style={{textDecoration: "line-through" , marginLeft:5}}>{price.prdPrice}</span></td>)

                                        })
                                        :<th scope="row"></th>
                                    }
                                   
                                </tr>
                                <tr>
                                    <th scope="row">รายละเอียดสินค้า</th>
                                    {
                                        listCompare !== null &&  listCompare.length !==0 ? 
                                        listCompare.map((des , index) => {

                                            return (<td key={index} style={{backgroundColor:"#e6f4f6" ,color:"#252531"}}><p>{des.prdDes}</p></td>)

                                        })
                                        :<th scope="row"></th>
                                    }
                                </tr>
                                <tr>
                                    <th scope="row">คะแนนสินค้า</th>
                                    {
                                        listCompare !== null &&  listCompare.length !==0 ? 
                                        listCompare.map((rating , index) => {

                                            var star = [];

                                            for(var i=0; i< parseInt(rating.prdRating); i++){

                                                    star.push(i)
                                             }
                                             return (<td key={index} style={{backgroundColor:"#f5f0e0"}}>{

                                                star.map((icon , last) => {

                                                    return (<StarIcon key={last}/>)

                                                })

                                            }</td>);
                                       })
                                       :<th scope="row"></th>
                                    }
                                    
                                  
                                </tr>
                        </tbody>
                         
                    
            </CustomTable>

                         </Grid>
                         <Snackbar open={openAlert} autoHideDuration={2500} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={statuss} sx={{ width: '100%' }}>
                                        {textMsg}
                                </Alert>
                        </Snackbar>
                    </Grid>
                    
                    :"Loadding"


            }
            
            </Box>
          
  )
}

export default TableComPare