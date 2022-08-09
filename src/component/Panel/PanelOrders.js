import React , {useState} from 'react';
import {Accordion , AccordionDetails , AccordionSummary , Typography  , Stack} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import PanelProduct from './PanelProduct';
import PanelCustomer from './PanelCustomer';

const PanelOrders = ({items}) => {

const [expanded, setExpanded] = useState(false);

const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel)
    setExpanded(isExpanded ? panel : false);
};

console.log(items)

const [statusOrder , setStatusOrder] = useState(items.status);

  return (<>
            <Accordion expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }} variant="div">
                    <Chip label={`${items.orderID}`} color="default" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="div">06 มิย. 65 <Chip label="รอตรวจสอบ" color="info" /></Typography>
                </AccordionSummary>
                <AccordionDetails>

                        {
                            statusOrder === "new" ?  <PanelCustomer /> : null
                        }
                    <PanelProduct status={"neworder"} />
                    
                </AccordionDetails>
                
            </Accordion>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }} variant="div">
                <Chip label="Order 3652255" color="default" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="div">05 มิย. 65 <Chip label="รอจัดส่ง" color="primary" /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                        {
                            statusOrder === "" ?  <PanelCustomer /> : null
                        }
                    <PanelProduct status={"complete"} />
                </AccordionDetails>
                
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }} variant="div">
                    <Chip label="Order 366552" color="default" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="div">
                04 มิย. 65 <Chip label="ยกเลิก" color="error" />
                </Typography>
                
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant='h6'>เหตุผลที่ยกเลิก : สินค้ามีจำนวนไม่พอ</Typography>
                <Typography variant='div'>ถ้ายกเลิกสินค้าจะไม่สามารถแก้ไขได้</Typography>
                        {
                            statusOrder === "neworder" ?  <PanelCustomer /> : null
                        }
                    <PanelProduct status={"cancel"} />
                    
                </AccordionDetails>
                
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }} variant="div">
                    <Chip label="Order 21445255" color="default" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="div">
                    04 มิย. 65 <Chip label="รอตรวจสอบ" color="info" />
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        {
                            statusOrder === "neworder" ?  <PanelCustomer /> : null
                        }
                    <PanelProduct status={"neworder"} />
                </AccordionDetails>
            </Accordion>
          </>
  )
}

export default PanelOrders