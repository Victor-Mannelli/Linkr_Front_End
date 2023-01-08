
import { useContext,  useState } from "react";
import { postUrl, postHashtag } from "../../service/server";
import styled from "styled-components";
import pfpic from "../assets/cat.jpg";
import { DataContext } from "../../context/auth";
import { CreateConfig } from "../../service/config";


export default function Post() {
    const [disabled, setDisabled] = useState(false);
    const config = CreateConfig();
    const [post, setPost] = useState({
        link: "",
        caption:"",
    });
    const { userObj } = useContext(DataContext);
    const [postComplete, setPostComplete] = useState({});
    const {profile_picture} = userObj
    function postLink(e){
        e.preventDefault();
        setDisabled(!disabled);   
        const array = post.caption.split(' ');
        console.log(array);
        let trends= [];

        array.forEach((iten)=>{
            if(iten.includes("#") === true){
                console.log(iten);
                trends = [...trends, iten]
            }
        })

        setPostComplete({
            link: post.link,
            caption: post.caption,
            trends: trends,
        })

        postUrl(postComplete,config).then((res)=>{
            setDisabled(false);
            setPost({
                link: "",
                caption:"",
            });
        }).catch((error)=>{
            alert("Houve um erro ao publicar seu link");
            setDisabled(false);
        })
    }

    function handleInput(e) {
        setPost({ ...post, [e.target.name]: e.target.value });
      }

    return(
        <Container>
        <img src={profile_picture} alt="profile_picture" />
        <form onSubmit={postLink}>
        <div>What are you going to share today?</div>
        <input
          autoComplete="off"
          disabled={disabled}
          onChange={handleInput}
          name="link"
          value={post.link}
          type="text"
          placeholder="http://..."
        />
        <input className="caption"
          autoComplete="off"
          disabled={disabled}
          onChange={handleInput}
          name="caption"
          value={post.caption}
          type="text"
          placeholder="what are you thinking?"
        />
        <div>
        <button disabled={disabled} type="submit">
            {!disabled ? (
              "Publish"
            ) : (
              "Publishing..."
            )}
        </button>
        </div>
        </form>
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    background: #FFFFFF;
    min-height: 209px;
    border-radius: 16px;
    padding: 15px;
    position: relative;
    font-family: 'Lato';
    font-style: normal;
    margin-bottom: 20px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }
    form{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content:space-between;
        width:100%;
        padding-left: 15px; 
    }
    input{
        width:100%;
        height: 30px;
        background: #EFEFEF;
        border:none;
        padding-left: 10px; 
    }
    .caption{
        width:100%;
        min-height: 66px;
        margin-bottom:35px;
    }
    div{
        width:100%;
        margin-top:5px;
        margin-bottom:5px;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
    }
    button{
        right:0;
        position: absolute;
        right: 15px;
        bottom: 15px;
        background: #1877F2;
        border:none;
        width: 112px;
        height: 31px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        border-radius: 5px;
    }
    @media(max-width: 614px){
        border-radius: 0px;
        img{
            display:none;
        }
    }
`