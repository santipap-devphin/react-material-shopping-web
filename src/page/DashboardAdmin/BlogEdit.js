import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmBlogEdit from '../../component/Form/FrmBlogEdit';

const BlogEdit = () => {
  return (<DrafDashboard txtpage={"แก้ไขข่าว"}>
            <FrmBlogEdit />
         </DrafDashboard>
  )
}

export default BlogEdit