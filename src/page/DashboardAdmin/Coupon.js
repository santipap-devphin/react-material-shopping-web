import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashCoupon from '../../wrappersbackend/coupon/DashCoupon';


const Coupon = () => {
  return (<DrafDashboard txtpage={"คูปองส่วนลด"}>
              <DashCoupon />
         </DrafDashboard>
  )
}

export default Coupon