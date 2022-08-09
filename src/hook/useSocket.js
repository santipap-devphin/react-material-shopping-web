import { useState , useEffect , useContext } from "react";
import DataContext from "../context/DataContext";
import io from "socket.io-client";

let socket;

const useSocket = () => {

    const {ENDPOINT_URL } = useContext(DataContext);
    const [statusConnect , setStatusConnect] = useState(false)
   
    useEffect(() => {

                    socket = io(ENDPOINT_URL)
                    socket.on('connect-success' , message => {
                    if(message.status === 1) setStatusConnect(true)
                })

    },[ENDPOINT_URL])


    return {socket , statusConnect};
}

const socketEmit = (attrkey , msg) => {

    socket.emit(attrkey, msg , (callback) => {

        if(callback === "ok"){
            console.log('success')
        }
    });

}

export {useSocket , socketEmit};