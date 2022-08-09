import React from 'react'
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import TableCategory from '../../component/Table/TableCategory';

const Category = () => {
  return ( <DrafDashboard txtpage={"หมวดหมู่"}>
                <TableCategory />
          </DrafDashboard>
  )
}

export default Category