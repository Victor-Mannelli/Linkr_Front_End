import styled from "styled-components";
import HomeHeader from "../components/homePage/homeHeader";
import Timeline from "../components/homePage/timeline";

export default function HomePage(){
    return (
        <>
            <HomeHeader/>
            <Content>
                <Timeline/>
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