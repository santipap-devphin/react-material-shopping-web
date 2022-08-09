import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import ChartPerProduct from '../../component/Chart/ChartPerProduct';

const ReportProSale = () => {
  return (<DrafDashboard txtpage={"รายงานยอดขายตามชนิดสินค้า"}>
              <ChartPerProduct />
          </DrafDashboard>
  )
}

export default ReportProSale