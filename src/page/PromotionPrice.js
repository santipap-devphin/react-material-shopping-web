import React from 'react';
import MainBlock from '../wrappers/MainBlock/MainBlock';
import PromotionList from '../wrappers/Promotion/PromotionList';


const PromotionPrice = () => {
  return (<MainBlock titlepage={"โปรโมชั่น"}>
                <PromotionList />
         </MainBlock>
  )
}

export default PromotionPrice