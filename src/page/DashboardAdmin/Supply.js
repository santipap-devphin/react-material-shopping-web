import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashSupply from '../../wrappersbackend/supply/DashSupply';

const Supply = () => {
  return (<DrafDashboard txtpage={"ตั้งค่าวิธีการจัดส่ง"}>
             <DashSupply />
         </DrafDashboard>
  )
}

export default Supply