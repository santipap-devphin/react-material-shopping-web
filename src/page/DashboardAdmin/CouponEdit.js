import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmEditCoupon from '../../component/Form/FrmEditCoupon';

const CouponEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขคูปอง"}>
                <FrmEditCoupon />
          </DrafDashboard>
  )
}

export default CouponEdit