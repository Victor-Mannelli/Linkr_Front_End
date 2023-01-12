import styled from "styled-components";
import Post from "./post";
import Posts from "./posts";
import InfiniteScroll from "react-infinite-scroller";

export default function Timeline({title}) {
    const boolean = !title ? true : false 
    return(
        <Container>
        {boolean ? <div className="title">  timeline</div> : <div className="title">  # {title}</div>}
        {boolean ? <Post/> : ""}
        <Posts trend={title}/>
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