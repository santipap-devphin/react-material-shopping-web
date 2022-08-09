import React , {useState} from 'react';
import {Accordion , AccordionDetails , AccordionSummary , Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import PanelProduct from './PanelProduct';
import PanelCustomer from './PanelCustomer';
import endpoint from '../../api/endpoint';
import months from '../../data/dates.json';

const PanelOrdersNew = ({indexs , items , statusChk , nextpage}) => {
const [expanded, setExpanded] = useState(false);
const [addr , setAddr] = useState({});

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

const handleChange = (panel) => async (event, isExpanded) => {
    
    setExpanded(isExpanded ? panel : false);
    
    if(isExpanded){

        let sp = panel.split("-");
         try {
            const response = await endpoint.get(`/checkout/profile/${sp[2]}`);
            if(response.data.code === 1){
                setAddr(response.data.list)
            }
            

            
        } catch (error) {
            console.error(error)
        }

   

    }
   
};

 const pos = indexs + 1;
 const pagePer = Math.ceil(pos / 6);
 items["page"] = pagePer;


return (<> {
                items["page"] === nextpage ?
                    <Accordion expanded={expanded === `panel-${indexs}-${items.userID}`} onChange={handleChange(`panel-${indexs}-${items.userID}`)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} variant="div">
                        <Chip label={`${items.orderID}`} color="default" />
                    </Typography>
                    <Typography sx={{ color: 'text.secondary'}} variant="div">{convertDate(items.orderDate)}
                            {
                                items.status === "new" && items.notify === true  ? <Chip label="รอตรวจสอบ" color="info" sx={{ml:0.5}} />
                                    : items.status === "new" && items.notify === false  ? <Chip label="ยังไม่ได้ชำระเงิน" color="default" sx={{ml:0.5}} /> 
                                    : items.status === "pending" && items.payment === true  ? <Chip label="รอจัดส่ง" color="primary" sx={{ml:0.5}} /> 
                                    : items.status === "cancel" ? <Chip label="ยกเลิก" color="error" sx={{ml:0.5}} /> 
                                    : items.status === "closed" ? <Chip label="จัดส่งแล้ว" color="success" sx={{ml:0.5}} /> :
                                    null
                            }
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    
                    {Object.entries(addr).length > 0 ? <PanelCustomer addr={addr} />  : null }
                    <PanelProduct items={items} status={items.status} statusChk={statusChk} />
                        
                    </AccordionDetails>
                    
                </Accordion>
                : null
           }
           
             </>
  )
}

export default PanelOrdersNew