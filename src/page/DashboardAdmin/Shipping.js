import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashShipping from '../../wrappersbackend/shipping/DashShipping';

const Shipping = () => {
  return (<DrafDashboard txtpage={"ส่งสินค้า"}>
              <DashShipping />
          </DrafDashboard>
        )
}

export default Shipping