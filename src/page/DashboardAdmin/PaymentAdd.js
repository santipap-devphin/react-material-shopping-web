import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmPaymentAdd from '../../component/Form/FrmPaymentAdd';

const PaymentAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มวิธีชำระเงิน"}>
            <FrmPaymentAdd />
         </DrafDashboard>
  )
}

export default PaymentAdd