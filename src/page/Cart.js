import React , {useContext , useState , useEffect} from 'react';
import MainBlock from '../wrappers/MainBlock/MainBlock';
import DataContext from '../context/DataContext'
import TableCart from '../component/Table/TableCart';
import CardShipping from '../component/Card/CardShipping';
import endpoint from '../api/endpoint';

const Cart = () => {

    const { userLogin
          , setPrvUrl
          , listCartProduct 
          , listCheckout
          , setListCheckout
          , setListCartProduct
        } = useContext(DataContext);
    const [supDefault , seSupDefault] = useState({}); 
    const [alignment, setAlignment] = useState(null);

   const reqSupply = async () => {
    
      try {

            const response  = await endpoint.patch(`/supply/${listCheckout === null ? 1 : listCheckout.deliver.supID}`);
            console.log(response)
            if(response.data.code === 1){
                seSupDefault({supID : response.data.list.id , supName : response.data.list.supplyname , supPrice : parseInt(response.data.list.supplyprice)})
            }
            
          } catch (error) {
            
            console.error(error);
          }
    }

    useEffect(() => {

       let signal  = true;
       if(signal){
            localStorage.setItem('cartproduct', JSON.stringify(listCartProduct));
       }
      return () => {
         signal = false;
    };

    },[listCartProduct])

    useEffect(() => {

      let signal  = true;

      if(signal){
          reqSupply();
          localStorage.setItem('checkout', JSON.stringify(listCheckout));
      }
      return () => {
          signal = false;
      };

     },[listCheckout])



  return (<MainBlock titlepage={"ตระกร้าสินค้า"}>
            <TableCart 
                    listCartProduct={listCartProduct} 
                    setListCartProduct={setListCartProduct} 
                    alignment={alignment} 
                    setAlignment={() => setAlignment}/>
              <CardShipping 
                    userLogin={userLogin} 
                    setPrvUrl={setPrvUrl} 
                    listCartProduct={listCartProduct} 
                    listCheckout={listCheckout} 
                    setListCheckout={setListCheckout} 
                    supDefault={supDefault} /> 
        </MainBlock>
      )
}

export default Cart