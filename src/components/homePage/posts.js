import { getPosts } from "../../service/server";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CardPost from "./cardPost";
import pfpic from "../assets/cat.jpg";
import { CreateConfig } from "../../service/config";
import  axios  from "axios";

export default function Posts({trend}){
    const arraymodelo =[{username:"João",image:pfpic,link:"http://", caption:"alooo", image_link: pfpic, title: "alooo", description:"esse é um #texto #exemplo aaaaaaaaaaaa sadsadsdsafsfsefsfse" }, {username:"João",image:pfpic,link:"http://", caption:"alooo", image_link: pfpic, title: "alooo", description:"esse é um texto exemplo" }];
    const config = CreateConfig()
    const [posts, setPosts] = useState([]);
    const [trends, setTrends] = useState([])

    useEffect(()=>{
        if (!trend) {
        getPosts(config).then((res)=>setPosts(res.data))
        .catch((error)=> alert("An error occured while trying to fetch the posts, please refresh the page"))
        }else{
            const SearchTrend = () => {
                const tratarSucesso = (res) => {
               
                    const dataArray = res.data
                    console.log(dataArray)
                    setTrends(dataArray)
                }
    
                const tratarErro = (res) => {
                    console.log(res)
                    alert(res.message)
                    //navigate("/")
                    //window.location.reload()
                }
                const requisicao = axios.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, config);
                requisicao.then(tratarSucesso)
                requisicao.catch(tratarErro)
            }
            SearchTrend()
        }
        
    },[trend])

    const VerifyPosts = () =>{
        if (posts==null) {
            return "...Loading"
        } else if(posts.length === 0){
            return "Você ainda não tem publicações"
        }else if (trends.length>0){
            return trends.map((p, i) =><CardPost 
            key={i}
            username={p.username}
            image={p.image}
            link= {p.link}
            caption={p.caption}
            image_link={p.image_link}
            title={p.title}
            description={p.description}
            />)
        }else{
            return posts.map((p, i)=><CardPost 
            key={i}
            obj={p}
            username={p.username}
            image={p.image}
            link= {p.link}
            caption={p.caption}
            image_link={p.image_link}
            title={p.title}
            description={p.description}
            />)
        }
    }
    return(
        VerifyPosts()
    )
}

const ContainerPosts = styled.div`
    padding-top:20px;
    width:100%;
    display:flex;
    justify-content:center;
    flex-direction: column;
`