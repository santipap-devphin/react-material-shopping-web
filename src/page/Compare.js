import React , {useContext  , useEffect} from "react";
import MainBlock from "../wrappers/MainBlock/MainBlock";
import DataContext from '../context/DataContext'
import TableComPare from "../component/Table/TableComPare";

const Compare = () => {
    
     const {listCompare , setListCompare } = useContext(DataContext)
     useEffect(()=> {
        localStorage.setItem("compare" , JSON.stringify(listCompare));
    },[listCompare])

  return (
            (<MainBlock titlepage={"เปรียบเทียบสินค้า"}>
                <TableComPare 
                    listCompare={listCompare} 
                    setListCompare={setListCompare} 
                />
            </MainBlock>
            )
        )
}

export default Compare