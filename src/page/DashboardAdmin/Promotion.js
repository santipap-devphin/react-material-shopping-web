import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashPromotion from '../../wrappersbackend/promotion/DashPromotion';

const Promotion = () => {
  return (<DrafDashboard txtpage={"โปรโมชั่น"}>
              <DashPromotion />
          </DrafDashboard>
  )
}

export default Promotion