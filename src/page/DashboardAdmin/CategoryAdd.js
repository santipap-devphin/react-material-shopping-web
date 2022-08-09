import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmCateAdd from '../../component/Form/FrmCateAdd';

const CategoryAdd = () => {
  return (<DrafDashboard txtpage={"เพิ่มหมวดหมู่"}>
                <FrmCateAdd />
         </DrafDashboard>
  )
}

export default CategoryAdd