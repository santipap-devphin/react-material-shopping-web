import React from 'react'

const MsgRight = ({content}) => {

  const convertDataChat = (content) => {

    var sp_date;
    var sp_last;
    var sp_time;

    if(content.indexOf(",") > -1){

         sp_date = content.split(",");
         sp_last = sp_date[1].split(" ")
         sp_time = sp_last[1].split(":");

    }
    
    return sp_time[0]+":"+sp_time[1];

 }

 return (<>
        
          <div className="msg-right">
                {content.message}
         </div>
         <div style={{float:"right"}}>
            
              {convertDataChat(content.date)}
         </div>
          </>
  )
}

export default MsgRight