import {useState , useEffect , useContext} from 'react';
import DataContext from '../context/DataContext'

let texts;

const AddProducts = () => {

    texts = "add";
    const [connects , setConnects] = useState(false);
    const {listCartProduct} = useContext(DataContext);

    console.log(listCartProduct)

    setConnects(true)

    return {connects};
 
}

export  {AddProducts}