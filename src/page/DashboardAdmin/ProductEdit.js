import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmEditProduct from '../../component/Form/FrmEditProduct';

const ProductEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขสินค้า"}>
            <FrmEditProduct />
          </DrafDashboard>
    
  )
}

export default ProductEdit