import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmPaymentEdit from '../../component/Form/FrmPaymentEdit';


const PaymentEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขวิธีชำระเงิน"}>
            <FrmPaymentEdit />
         </DrafDashboard>
  )
}

export default PaymentEdit