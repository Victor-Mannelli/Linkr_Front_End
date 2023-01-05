import styled from "styled-components";
import Post from "./publicacao";
import Posts from "./posts";

export default function Timeline() {
    return(
        <Container>
        <div className="title">timeline</div>
        <Post/>
        <Posts/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 150px;
    width: 611px;

    .title{
        width:100%;
        margin-bottom:40px;
        color: #FFFFFF;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
    }

    @media(max-width: 614px){
        width: 100%;

        .title{
            margin-bottom:20px;
            padding-left:15px
        }
    
    }
`