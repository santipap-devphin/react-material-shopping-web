import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmAddSize from '../../component/Form/FrmAddSize';

const SizeAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มหน่วย"}>
            <FrmAddSize />
          </DrafDashboard>
  )
}

export default SizeAdd