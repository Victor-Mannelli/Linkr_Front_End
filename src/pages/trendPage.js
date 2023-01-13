import styled from "styled-components";
import HomeHeader from "../components/homePage/header/homeHeader";
import Timeline from "../components/homePage/timeline";
import TrendsBox from "../components/trendsBox"; 
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { DataContext } from "../context/auth";

export default function TrendPage(){
    const {hashtag} = useParams();
    const { setIsSearch } = useContext(DataContext);
    setIsSearch(false)

    return (
        <>
            <HomeHeader/>
            <Content>
                <Timeline title={hashtag}/>
                <TrendsBox/>
            </Content>
        </>
    )
}

const Content = styled.div`
    min-height: 100vh;
    background: #333333;
    display:flex;   
    justify-content:center;
    padding-top: 72px;
`