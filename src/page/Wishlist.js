import React , {useContext , useEffect} from "react";
import MainBlock from "../wrappers/MainBlock/MainBlock";
import DataContext from '../context/DataContext'
import Tablewishlist from "../component/Table/Tablewishlist";

const Wishlist = () => {
    
    const {listWishList , setListWishList , listCartProduct , setListCartProduct } = useContext(DataContext)

    useEffect(() => {
        localStorage.setItem('wishlist' , JSON.stringify(listWishList))
    },[listWishList])
      useEffect(() => {
         localStorage.setItem('cartproduct' , JSON.stringify(listCartProduct))
    },[listCartProduct])


     return (<MainBlock titlepage={"สนใจสินค้า"}>
                <Tablewishlist
                    listWishList={listWishList}
                    setListWishList={setListWishList}
                    listCartProduct={listCartProduct}
                    setListCartProduct={setListCartProduct}
                />
            </MainBlock>)
}

export default Wishlist;