import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmAddProduct from '../../component/Form/FrmAddProduct';

const ProductAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มสินค้า"}>
            <FrmAddProduct />
        </DrafDashboard>
  )
}

export default ProductAdd