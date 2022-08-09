import React , {useContext , useEffect} from 'react';
import MainBlock from '../wrappers/MainBlock/MainBlock';
import DataContext from '../context/DataContext'
import SecCheckOutMain from '../wrappers/Checkout/SecCheckOutMain';

const CheckOut = () => {

    const {listCartProduct , listCheckout} = useContext(DataContext)

    useEffect(() => {
        localStorage.setItem('cartproduct', JSON.stringify(listCartProduct));
    },[listCartProduct])
    
       useEffect(() => {
            localStorage.setItem('checkout', JSON.stringify(listCheckout));
     },[listCheckout])
    return (<MainBlock titlepage={"สั้งซื้อสินค้า"}>
                <SecCheckOutMain />
            </MainBlock>
           )
}

export default CheckOut