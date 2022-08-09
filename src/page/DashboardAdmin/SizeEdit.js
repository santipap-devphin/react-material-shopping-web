import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmEditSize from '../../component/Form/FrmEditSize';

const SizeEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขหน่วย"}>
             <FrmEditSize />
         </DrafDashboard>
  )
}

export default SizeEdit