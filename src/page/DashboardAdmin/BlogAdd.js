import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import FrmBlogAdd from '../../component/Form/FrmBlogAdd';

const BlogAdd = () => {
  return ( <DrafDashboard txtpage={"เพิ่มข่าว"}>
                <FrmBlogAdd />
           </DrafDashboard>
  )
}

export default BlogAdd