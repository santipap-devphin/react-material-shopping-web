import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmCateEdit from '../../component/Form/FrmCateEdit';

const CategoryEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขหมวดหมู่"}>
            <FrmCateEdit />
         </DrafDashboard>
  )
}

export default CategoryEdit