import React , {useContext , useEffect} from "react";
import MainBlock from "../wrappers/MainBlock/MainBlock";
import DataContext from '../context/DataContext'
import ShopList from "../wrappers/Shop/ShopList";

const Shop = () => {

    const {relateProduct , listWishList ,listCompare} = useContext(DataContext)

     useEffect(() => {
          localStorage.setItem('relateproduct', JSON.stringify(relateProduct));
     },[relateProduct])

     useEffect(() => {
         localStorage.setItem("wishlist" , JSON.stringify(listWishList));
     },[listWishList])

     useEffect(() => {
      localStorage.setItem("compare" , JSON.stringify(listCompare));
    },[listCompare])

     

  return (<MainBlock titlepage={"สินค้า"}>
              <ShopList />
          </MainBlock>
         )
}

export default Shop