import { getPosts } from "../../service/server";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function Posts(){
    const [posts, setPosts] = useState(null);

    useEffect(()=>{
        getPosts().then((res)=>setPosts(res.data))
        .catch((error)=> alert("An error occured while trying to fetch the posts, please refresh the page"))
    })
    return(
        <ContainerPosts>
            {
            posts==null?("...Loading")
            : 
            posts.length==0?("Você ainda não tem publicações")
            : 
            posts.map((p)=>(p.link))
            }
        </ContainerPosts>
    )
}

const ContainerPosts = styled.div`
    padding-top:20px;
    width:100%;
    display:flex;
    justify-content:center;
`