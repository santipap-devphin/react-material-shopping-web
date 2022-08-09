import React , {useState , useEffect} from 'react';
import MainBlock from '../wrappers/MainBlock/MainBlock';
import CateMain from '../wrappers/CategoryGroup/CateMain';


const CategoryGroup = () => {
  return (<MainBlock titlepage="หมวดหมู่ บล๊อค">
                <CateMain />
         </MainBlock>
    
  )
}

export default CategoryGroup