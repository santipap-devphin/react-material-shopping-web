import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmAddCoupon from '../../component/Form/FrmAddCoupon';

const CouponAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มคูปอง"}>
            <FrmAddCoupon />
        </DrafDashboard>
  )
}

export default CouponAdd