import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashOrder from '../../wrappersbackend/order/DashOrder';

const Orders = () => {

  return (<DrafDashboard txtpage={"รายการสั้งซื้อ"}>
            <DashOrder />
          </DrafDashboard>
         )
}

export default Orders