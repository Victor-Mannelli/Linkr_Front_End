import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import {  useNavigate } from "react-router-dom";
export default function CardPost({username,image,link,caption,image_link,title,description}){

    const tagStyle = {
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer'
    }
    const navigate = useNavigate();
    return(
        <Card>
            <img className="perfil" src={image} alt="profile_picture" />
            <div className="column">
                <div className="name">{username}</div>
                <div className="caption">
                    <ReactTagify 
                    tagStyle={tagStyle}
                    tagClicked={(tag)=> navigate(`/hashtag/${tag.replace("#","")}`)}>{caption}</ReactTagify></div>
                <div className="link">
                    <div className="texto">
                        <h1>{title}</h1>
                        <p className="description">{description}</p>
                        <p className="url">{link}</p>
                    </div>
                    <img src={image_link} alt="profile_picture" />
                </div>
            </div>
        </Card>
    )
}
const Card= styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    background: #171717;
    height: 276px;
    border-radius: 16px;
    padding: 15px;
    position: relative;
    font-family: 'Lato';
    font-style: normal;
    margin-bottom:20px;
    color: #FFFFFF;
    .name{
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        margin-top:5px;
    }
    .caption{
        color: #B7B7B7;
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        line-break: normal;
    }
    .perfil{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }
    .title{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }
    p{
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        line-break: normal;
    }
    .description{
        color: #9B9595;
    }
    .url{
        color: #CECECE;
    }
    .column{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content:space-between;
        width:100%;
        padding-left: 15px; 
        
        div{
            width:100%;
            padding-left: 10px; 
        }
    }
    .link{
        width: 100%;
        height: 155px;
        display:flex;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        color: #B7B7B7;
    }
    .texto{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding:10px;
    }
    img{
        width: 153.44px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
    }
    @media(max-width: 614px){
        border-radius: 0px;
        height: 232px;
        img{
            max-width: 95px;
            max-height:115px;
        }
        .link{
            max-height:115px;
        }
        .texto{
            padding: 5px;
        }
    }
`