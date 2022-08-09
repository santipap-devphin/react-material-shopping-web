import React  from "react";
import MainBlock from "../wrappers/MainBlock/MainBlock";
import { useParams } from "react-router-dom";
import MainContent from "../wrappers/BlogContent/MainContent";

const BlogContent = () => {
    const {id} = useParams();

   return(<MainBlock titlepage={"รายละเอียด บล๊อค"}>
            <MainContent id={id} />
        </MainBlock>)
}

export default BlogContent