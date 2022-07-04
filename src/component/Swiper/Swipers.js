import React from 'react';
import {Stack} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import MapIcon from '@mui/icons-material/Map';

const Swipers = ({data}) => {
  return (
    <Swiper
            rewind={true}
            navigation={false}
            modules={[Navigation]}
            className="swiper"
            
        >
            {
            data.map((item , keys) => {

                return   <SwiperSlide key={keys}>
                            <Stack justifyContent="center" alignItems="center" spacing={2} sx={{pt:2}}>
                                <div><img src="../../assets/img/1.jpg" style={{borderRadius: '50%'}}/></div>
                                <div style={{lineHeight:"30px" , paddingLeft:"60px" , paddingRight:"60px"}}><b>{item.content}</b></div>
                                <MapIcon />
                                <div>{item.customerName}</div>
                                <div>{item.title}</div>
                            </Stack>
                        </SwiperSlide>

            })
            }
        </Swiper>
  )
}

export default Swipers