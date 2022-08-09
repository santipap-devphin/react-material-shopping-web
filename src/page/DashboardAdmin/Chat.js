import React from 'react';
import DrafDashboard from '../../component/DashBoard/DrafDashboard';
import MessageContainer from '../../component/Chat/MessageContainer';
import MessageBox from '../../component/Chat/MessageBox';

const Chat = () => {
  return (<DrafDashboard txtpage={"Contact Support"}>
                <MessageContainer>
                    <MessageBox />
                </MessageContainer>
            </DrafDashboard>
  )
}

export default Chat