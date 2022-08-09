import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import TableTags from '../../component/Table/TableTags';

const Tags = () => {
  return (<DrafDashboard txtpage={"ข้อมูล Tag "}>
                <TableTags/>
          </DrafDashboard>
  )
}

export default Tags