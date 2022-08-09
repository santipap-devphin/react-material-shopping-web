import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import DashBlog from '../../wrappersbackend/blog/DashBlog';

const Blog = () => {
  return (<DrafDashboard txtpage={"ข่าวสาร"}>
                <DashBlog />
          </DrafDashboard>
        )
 }

export default Blog