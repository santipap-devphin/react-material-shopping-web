import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmSupplyEdit from '../../component/Form/FrmSupplyEdit';

const SupplyEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขวิธีการจัดส่ง"}>
               <FrmSupplyEdit/>   
          </DrafDashboard>
    )
}

export default SupplyEdit