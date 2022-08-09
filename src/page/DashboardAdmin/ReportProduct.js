import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import ChartReport from '../../component/Chart/ChartReport';

const ReportProduct = () => {
  return (<DrafDashboard txtpage={"รายงานยอดขายสินค้า"}>
               <ChartReport />
          </DrafDashboard>
  )
}

export default ReportProduct