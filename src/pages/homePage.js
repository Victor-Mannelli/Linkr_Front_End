import styled from "styled-components";
import HomeHeader from "../components/homePage/homeHeader";

export default function HomePage(){
    return (
        <>
            <HomeHeader/>
            <Content></Content>
        </>
    )
}
const Content = styled.div`
    height: 100vh;
    background: #333333;
`