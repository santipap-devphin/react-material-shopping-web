import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import ProductList from '../../component/Product/ProductList';

const Product = () => {
  return (<DrafDashboard txtpage={"สินค้า"}>
            <ProductList />
         </DrafDashboard>
  )
}

export default Product