import React , {Fragment , useEffect} from 'react';
import MessageBoxLeft from './MessageBoxLeft';
import MessageBoxRight from './MessageBoxRight';
import endpoint from '../../api/endpoint';
import { useSocket , socketEmit } from '../../hook/useSocket';
import { format } from 'date-fns';
import { useState } from 'react';

const MessageBox = () => {

  const {socket , statusConnect}  =   useSocket();
  const [listUser , setListUser] = useState([]);
  const [activeChat , setActiveChat] = useState('chat-2');
  const [newMessage, setNewMessage] = useState({});
  const [typeMessage , setTypeMessage] = useState('');
  const [msgUser , setMsgUser] = useState([]);
  const [msgPos , setMsgPos] = useState({});
  
  let userID;
 

  useEffect(()=> {

    let isApiSubscribed = true;
    
    if(!isApiSubscribed) return {error: "useEffect cleanup"};
    if(!statusConnect) return {error: "socket not connect"}
   
    console.log('socket admin');
    socket.on('list-message-broadcast-admin', message => {

         setMsgUser(messages => [ ...messages , message ])
         setMsgPos(message)

       
         
      return () => {
          // cancel the subscription
         
          isApiSubscribed = false;
      };
    });

    socket.on('result-message-admin', message => {

         console.log('result-message-admin')
         console.log(message)
         setMsgUser(messages => [ ...messages , message ])
         setTypeMessage('')
        

         return () => {
          // cancel the subscription
        
          isApiSubscribed = false;
      };

    });

    socket.on('callback-register-new-member', message => {

      console.log('callback-register-new-member')

      setListUser([...listUser , message]);

      setNewMessage(message)

      return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
 
    });

    
},[statusConnect , socket])

  useEffect(()=>{

    let isApiSubscribed = true;

    const getUser = async () => {

          try {
            const response = await endpoint.patch("/message");
            if(response.status === 200 && response.statusText === "OK"){

                //console.log(response.data)
                setListUser(response.data)

            }
            //console.log(response)
            
          } catch (error) {
              console.error(error)
          }
     }

     if(isApiSubscribed){

          getUser();
     }

     

    return () => {
      // cancel the subscription
      isApiSubscribed = false;
  };

  } , [])

  useEffect(() => {

    let isApiSubscribed = true;

    const fetchMsg = async() => {
        
        if(activeChat.indexOf("-") > - 1){

            var sp = activeChat.split("-");
            userID = sp[1];
           
        }

        try {

            const response = await endpoint.post("/message" ,{id:userID});
            if(response.status === 200 && response.statusText === "OK"){

                if(response.data.code ===1){
                    console.log(response.data.list)
                    setMsgUser(response.data.list);
                    
                 }else{
                    setMsgUser([]);
                }
            }
        } catch (error) {
            console.error(error);
        }


    }

    if(isApiSubscribed){
        fetchMsg();
    }
    


    return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
    

  },[userID , activeChat])

  const sendMsg = () => {

    if(!statusConnect) return {error: "socket not connect"}

    if(!typeMessage) return {error: "not message required"}

    if(activeChat.indexOf("-") === -1) return {error: "not id user"}

    let userIdd = activeChat.split("-"); 
    
    const datetime = format(new Date() , 'MMMM dd ,yyyy pp');
      
    try {

      //หมายเหตุ ที่ต้องใส่ admin เพราะ userที่ login เข้ามาจะเป็น admin
      //msginsert คือ object ที่ต้อง insert เข้า json file
      //msgcallback คือ object ที่ต้อง callback กลับมายั่งฝั่ง cilent
   
      let msginsert = {id:Number(msgUser.length)+1,username:"admin" , msg:typeMessage , userId : userIdd[1] , date:datetime}
      let msgcallback = {id:Number(userIdd[1]),img:null, date:datetime ,name:"admin", message:typeMessage}

      socketEmit('chat-message-from-admin' , {msg:msgcallback , msgin:msginsert})
      
  } catch (error) {
      console.error(error.message);
  }

  }

  useEffect(()=> {

    var size = Object.keys(msgPos).length;
    if(size > 0){

        const finds = listUser.find((user) => {

            if(user.userId === msgPos.id){
                user["message"] = msgPos.message;
                user["status"] = user["status"]+1;
                return user;
            }
        });

        const otherData = listUser.filter((data) => data.userId !== msgPos.id);
        otherData.unshift(finds)
       
        setListUser(otherData);
        //console.log(listUser)

        /*listUser.sort((a,b) => {

          return b["userId"] - a["userId"]

        })*/

        //console.log(listUser)

        setMsgPos({})
        //console.log(listUser);
    }
 },[listUser , msgPos])

 
return (
        <Fragment>
          
                <MessageBoxLeft 
                    users={listUser} 
                    activeChat={activeChat} 
                    setActiveChat={setActiveChat} 
                    newMessage={newMessage} 
                    setNewMessage={setNewMessage}/>
                <MessageBoxRight 
                  msgUser={msgUser} 
                  activeChat={activeChat} 
                  typeMessage={typeMessage} 
                  setTypeMessage={setTypeMessage} 
                  sendMsg={sendMsg}  />
              
        </Fragment>
  )
}

export default MessageBox