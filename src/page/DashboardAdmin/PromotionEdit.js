import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmPromotionEdit from '../../component/Form/FrmPromotionEdit';

const PromotionEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขโปรโมชั่น"}>
                <FrmPromotionEdit />
          </DrafDashboard>
        )
}

export default PromotionEdit