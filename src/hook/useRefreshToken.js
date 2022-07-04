import endpoint from "../api/endpoint";
import { useContext} from "react";
import DataContext from "../context/DataContext";



const useRefreshToken = () => {

    const {setAuth} = useContext(DataContext);
    
    const refresh = async () => {

        const response = await endpoint.get('/refresh' , {withCredentials:true});

        setAuth(prev => {
            //console.log(JSON.stringify(prev));
            //console.log(response.data.accessToken)
            return {...prev , accessToken:response.data.accessToken}
        })

        return response.data.accessToken;

    }
    return refresh;

}

export default useRefreshToken;





