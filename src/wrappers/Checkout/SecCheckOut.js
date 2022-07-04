import React from 'react';
import PanelAddress from '../../component/PanelBlock/PanelAddress';
import PanelProductChk from '../../component/PanelBlock/PanelProductChk';
import PanelCoupon from '../../component/PanelBlock/PanelCoupon';
import PanelPayment from '../../component/PanelBlock/PanelPayment';

const SecCheckOut = () => {
  return (
         <>
            <PanelAddress />
            <PanelProductChk />
            <PanelCoupon />
            <PanelPayment />
         </>
         
  )
}

export default SecCheckOut