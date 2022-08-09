import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmSupplyAdd from '../../component/Form/FrmSupplyAdd';

const SupplyAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มวิธีการจัดส่ง"}>
              <FrmSupplyAdd />   
          </DrafDashboard>
  )
}

export default SupplyAdd