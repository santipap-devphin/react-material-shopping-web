import React , {useState , useContext , useEffect} from 'react';
import DataContext from '../../context/DataContext';
import styled  from "styled-components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const BackupTableCompare = () => {

    const {listCompare , setListCompare} = useContext(DataContext);

    const [value, setValue] = useState(2);

    const [rowObj , setRowObj] = useState({ rowAction:[] ,
                                            rowProduct:[],
                                            rowPrice:[],
                                            rowDes:[],
                                            rowRating:[]});

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

    console.log('check');

    //setRowObj({rowAction :[] , rowProduct:[] , rowPrice:[] , rowDes:[] , rowRating:[]})
    setRowObj(prevState => [...prevState.rowAction, ]);
     /*rowObj.rowAction = [];
    rowObj.rowPrice = [];
    rowObj.rowRating = [];
    rowObj.rowProduct = [];
    rowObj.rowDes = [];*/

    setLoadCom(false);

    if(listCompare !== null && listCompare.length !==0){

        listCompare.map((item , index) => {

            console.log(item.prdDes);
            if(item.prdDes){
                 rowObj.rowDes.push(item.prdDes +"\n");
            }
            if(item.prdPriceLast || item.prdPrice) {
                 rowObj.rowPrice.push("<span style='text-decoration: line-through;'>" +item.prdPrice+"</span> <span style='color:#e90042;'>"+ item.prdPriceLast +"<span>");
            }
            if(item.prdRating){
                rowObj.rowRating.push(item.prdRating);
            }
            if(item.prdId){
                rowObj.rowAction.push(item.prdId);
            }
            if(item.rowProduct || item.prdImage){

                let newItems = {img:item.prdImage , title:item.prdTitle};

                rowObj.rowProduct.push(newItems);
            }
           }
        )
    }
   
    setLoadCom(true)

 },[listCompare])

 const handleClose = () => {

    setOpenAlert(false)
}

    return (  <Box sx={ ScreenTh ? { flexGrow: 1 , m:2 } : { flexGrow: 1 , m:10 }}>
        {
            loadCom ? 
            <Grid container gutter={24} justify='center' style={{overflowX: "auto"}}>
                    <Grid item xs={12} style={{overflow: 'auto' , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 20%)"}}>
                    <CustomTable id={0} key={0} style={{borderSpacing: 0}}>
                     
                     <thead>
                        <tr>
                            <th scope="row">Action</th>
                            {
                                 rowObj.rowAction !== null &&  rowObj.rowAction.length !==0 ? 

                                    rowObj.rowAction.map((item , index) => {

                                        return (<th scope="col" key={`col${index}`}>
                                                    <IconButton
                                                    size="large"
                                                    edge="end"
                                                    aria-label={`colof${index}`}
                                                    aria-controls={"tableCompare"}
                                                    aria-haspopup="true"
                                                    onClick={()=> onClickitem(item)}
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
                                <th scope="row">Product Info</th>
                                {
                                    rowObj.rowProduct !== null && rowObj.rowProduct.length !==0 ? 

                                    rowObj.rowProduct.map((item ,index) => {

                                        return (<td key={`Product${index}`}><img src={item.img} style={ScreenTh ? {width:"150px"} : {width:"292px"}} /> <p>{item.title}</p></td>)

                                    })

                                : <th scope="row"></th>
                                }
                               
                            </tr>
                            <tr>
                                <th scope="row">Price</th>
                                {
                                    rowObj.rowPrice !== null && rowObj.rowPrice.length !==0 ? 
                                    rowObj.rowPrice.map((price , index) => {

                                        return (<td key={index}><p dangerouslySetInnerHTML={{__html: price}}></p></td>)

                                    })
                                    :<th scope="row"></th>
                                }
                               
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                {
                                    rowObj.rowDes !== null && rowObj.rowDes.length !==0 ? 
                                    rowObj.rowDes.map((des , index) => {

                                        return (<td key={index}><p dangerouslySetInnerHTML={{__html: des}}></p></td>)

                                    })
                                    :<th scope="row"></th>
                                }
                            </tr>
                            <tr>
                                <th scope="row">Rating</th>
                                {
                                    rowObj.rowRating !== null && rowObj.rowRating.length !==0 ? 
                                    rowObj.rowRating.map((rating , index) => {

                                        var star = [];

                                        for(var i=0; i< parseInt(rating); i++){

                                                star.push(i)
                                         }
                                         return (<td key={index}>{

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

export default BackupTableCompare