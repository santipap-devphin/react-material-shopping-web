import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmPromotionAdd from '../../component/Form/FrmPromotionAdd';

const PromotionAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มโปรโมชั่น"}>
            <FrmPromotionAdd />
         </DrafDashboard>
  )
}

export default PromotionAdd