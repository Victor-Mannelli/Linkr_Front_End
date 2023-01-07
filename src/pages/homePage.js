import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/auth";
import styled from "styled-components";
import HomeHeader from "../components/homePage/homeHeader";
import Timeline from "../components/homePage/timeline";
import TrendsBox from "../components/homePage/trendsBox";

export default function HomePage(){
    const navigate = useNavigate();
	//const { token } = useContext(DataContext);
    const token = "2a19cb2e-4a67-48df-8e3f-e22a8b31ba8b"
	useEffect(() => {
		//token === null && navigate("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    return (
        <>
            <HomeHeader/>
            <Content>
                <Timeline/>
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
`

