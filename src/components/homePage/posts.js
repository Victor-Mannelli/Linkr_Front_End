import { getPosts } from "../../service/server";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CardPost from "./cardPost";
import pfpic from "../assets/cat.jpg";

export default function Posts(){
    const arraymodelo =[{username:"João",image:pfpic,link:"http://", caption:"alooo", image_link: pfpic, title: "alooo", description:"esse é um texto exemplo aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaasa sadsadsdsafsfsefsfse" }, {username:"João",image:pfpic,link:"http://", caption:"alooo", image_link: pfpic, title: "alooo", description:"esse é um texto exemplo" }];
    const [posts, setPosts] = useState(arraymodelo);

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
            posts.map((p)=><CardPost 
            username={p.username}
            image={p.image}
            link= {p.link}
            caption={p.caption}
            image_link={p.image_link}
            title={p.title}
            description={p.description}
            />)
            }
        </ContainerPosts>
    )
}

const ContainerPosts = styled.div`
    padding-top:20px;
    width:100%;
    display:flex;
    justify-content:center;
    flex-direction: column;
`