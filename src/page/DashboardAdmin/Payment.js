import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashPayment from '../../wrappersbackend/payment/DashPayment';

const Payment = () => {
  return (<DrafDashboard txtpage={"ตั้งค่าวิธีชำระเงิน"}>
                <DashPayment />
          </DrafDashboard>
        )
}

export default Payment