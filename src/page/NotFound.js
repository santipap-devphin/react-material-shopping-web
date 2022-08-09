import React from "react";
import MainBlock from "../wrappers/MainBlock/MainBlock";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

const NotFound = () => {

    let navigate = useNavigate();
    const goBackPage = () => {

        //navigate(-1);
        navigate('/');

    }
    return (<MainBlock titlepage={"ไม่พบหน้านี้"}>
                <Stack textAlign="center" sx={{pt:5 , pb:5}}>
                    <Typography variant="h3">Not Found</Typography>
                    <Typography variant="h5"><Button onClick={goBackPage}>กลับหน้าหลัก</Button></Typography>
                </Stack>
            </MainBlock>
         )
}

export default NotFound