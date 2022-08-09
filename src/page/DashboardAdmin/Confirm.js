import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashConfirm from '../../wrappersbackend/confirm/DashConfirm';

const Confirm = () => {
  return (<DrafDashboard txtpage={"ตรวจสอบยอดชำระ"}>
                <DashConfirm />
          </DrafDashboard>
  )
}

export default Confirm