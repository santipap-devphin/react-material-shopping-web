import React , {useContext  , useEffect} from "react";
import MainBlock from "../wrappers/MainBlock/MainBlock";
import { useParams } from "react-router-dom";
import DataContext from '../context/DataContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageProduct from "../wrappers/Product/ImageProduct";
import DesProduct from "../wrappers/Product/DesProduct";
import RelatedProduct from "../wrappers/Product/RelatedProduct";

const ShopProduct = () => {

    //localStorage.removeItem("relateproduct");
    const {id} = useParams();
    const {styles  , reData , relateProduct , setRelateProduct , listCartProduct , setListCartProduct} = useContext(DataContext)
    const Screensm = useMediaQuery('(max-width:768px)');
  
    const finds = reData.find((item) => item.id === id);

    useEffect(()=> {

        //console.log(finds)

        window.scrollTo({top:0}) 

        if(finds === undefined) return;
        if(relateProduct === null || relateProduct[0] === null){

            setRelateProduct([finds])
           
        }else{

            const checkSame = relateProduct.find((data) => data.id === id);

            if(checkSame === undefined){

                setRelateProduct([...relateProduct , finds])
            }
        }
    },[])

    useEffect(() => {
         //localStorage.removeItem("relateproduct");
        localStorage.setItem('relateproduct', JSON.stringify(relateProduct));
       //console.log(relateProduct)

        //console.log("inin");
     }, [relateProduct])

     useEffect(() => {

        localStorage.setItem('cartproduct', JSON.stringify(listCartProduct));
   
     },[listCartProduct])

    //console.log(relateProduct)
    

    return (<MainBlock titlepage={"รายละเอียดสินค้า"}>
                {
                    finds ? 
                    <>
                    <ImageProduct listCartProduct={listCartProduct} setListCartProduct={setListCartProduct} product={finds} /> 
                    <DesProduct product={finds} sizes={Screensm} />
                    </>
                    : 
                    null
                }
                {
                     relateProduct !== null && relateProduct[0] !== null  ? <RelatedProduct data={relateProduct} styles={styles.textBlack}/> : null
                }
             </MainBlock>
            )
    }

export default ShopProduct