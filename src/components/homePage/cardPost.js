import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import Buttons from "./buttons";
import axios from "axios";
import { DataContext } from "../../context/auth";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function CardPost({ username, image, link, caption, image_link, title, description, id, obj }) {
    const [boolLike, setboolLike] = useState(false);
    const [likeId, setLikeId] = useState("");
    const [disabled, setDisable] = useState(true);
    const [likes, setLikes] = useState([]);
    const [update, setUpdate] = useState(false);
    const [likePhrase, setPhrase] = useState("");
    const { token } = useContext(DataContext)
    const tagStyle = {
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer'
    }
    const VerifyLikes = (array) => {
        const isMe = array.filter((item) => item.isyou === true)
        console.log(isMe)
        console.log(array)
        const bool = !boolLike
        setPhrase("")
        if (isMe.length > 0 && update === false) {
            setLikeId(isMe[0].id)
            setboolLike(bool)
            let x = likePhrase
            if (array.length === 1) {
                x = "Você"
            } else if (array.length === 2) {
                const name = array[1].id !== isMe[0].id ? array[1].name : array[0].name
                x = "Você e " + name
            } else {
                for (let i = 0; i < 3; i++) {
                    const element = array[i].name;

                    if (i == 1 && !array[i].isyou) {
                        x = x + "Você"
                    } else if (i == 2 && !array[i].isyou) {
                        x = x + "," + element
                    } else if (!array[i].isyou) {
                        x = x + `e outras  ${array[0].count - 2 === 0 ? "" : array[0].count - 2} pessoas`
                    } else {
                        i--
                    }

                }
            }

            console.log(x)
            setPhrase(x)
        } else if (array.length > 0) {
            let x = likePhrase
            if (array.length === 1) {
                x = array[0].name
            } else if (array.length === 2) {
                x = array[0].name + " e " + array[1].name
            } else {
                for (let i = 0; i < 3; i++) {
                    const element = array[i].name;

                    if (i == 1 && !array[i].isyou) {
                        x = x + element
                    } else if (i == 2 && !array[i].isyou) {
                        x = x + "," + element
                    } else if (!array[i].isyou) {
                        x = x + `e outras  ${array[0].count - 2 === 0 ? "" : array[0].count - 2} pessoas`
                    } else {
                        i--
                    }

                }
            }
        }
    }
    const ClickLike = () => {
        const bool = !boolLike
        setboolLike(bool)
        if (disabled) {
            if (bool) {
                setDisable(false)
                const PostLike = () => {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    const body = {
                        post_id: id
                    }
                    const tratarSucesso = (res) => {

                        const dataArray = res
                        console.log(dataArray)
                        setLikeId(res.data.id)
                        setUpdate("bool")
                        setDisable(true)

                    }

                    const tratarErro = (res) => {
                        console.log(res)
                        alert(res.message)
                        setDisable(true)
                        //navigate("/")
                        //window.location.reload()
                    }

                    const requisicao = axios.post(`${process.env.REACT_APP_API}/likes`, body, config);
                    requisicao.then(tratarSucesso)
                    requisicao.catch(tratarErro)
                }
                PostLike();

            } else {
                setDisable(false)
                const DelLike = () => {
                    console.log(likeId)
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            id: likeId
                        }
                    }
                    const tratarSucesso = (res) => {

                        const dataArray = res.data
                        console.log(dataArray)
                        setUpdate("update")
                        setDisable(true)
                    }

                    const tratarErro = (res) => {
                        console.log(res)
                        alert(res.message)
                        setDisable(true)
                        //navigate("/")
                        //window.location.reload()
                    }

                    const requisicao = axios.delete(`${process.env.REACT_APP_API}/likes`, config);
                    requisicao.then(tratarSucesso)
                    requisicao.catch(tratarErro)
                }
                DelLike();
            }
        }

    }
    useEffect(() => {

        const GetLikes = () => {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    post_id: id
                }
            }

            const tratarSucesso = (res) => {
                console.log(res)
                const dataArray = res.data
                VerifyLikes(dataArray)
                setLikes(dataArray)
            }

            const tratarErro = (res) => {
                console.log(res)
                alert(res.message)
                //navigate("/")
                //window.location.reload()
            }

            const requisicao = axios.get(`${process.env.REACT_APP_API}/likes`, config);
            requisicao.then(tratarSucesso)
            requisicao.catch(tratarErro)
        }
        GetLikes();
        //setInterval(GetLikes,2000)
    }, [update, id])


    const displayLike = () => {
        if (likes.length <= 0) {
            return 0 + " likes"
        } else {
            return Number(likes[0].count) === 1 ? likes[0]?.count + "like" : likes[0]?.count + "likes"
        }
    }
    const navigate = useNavigate();
    return (
        <Card>
            <img className="perfil" src={image} alt="profile_picture" />
            <LikeDiv id={id} boolean={boolLike}>
                {!boolLike ? <AiOutlineHeart onClick={ClickLike} /> : <AiFillHeart onClick={ClickLike} />}
                <p>{displayLike()}</p>
            </LikeDiv>

            <Tooltip place="bottom" style={{ backgroundColor: "white", color: "black" }} anchorId={id} content={likePhrase} />


            <div className="column">
                <div className="name">{username}
                    <Buttons
                        obj={obj}
                    />
                </div>
                <div className="caption">
                    <ReactTagify
                        tagStyle={tagStyle}
                        tagClicked={(tag) => navigate(`/hashtag/${tag.replace("#", "")}`)}>{caption}</ReactTagify></div>
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
const Card = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    background: #171717;
    height: 276px;
    border-radius: 16px;
    padding: 18px;
    position: relative;
    font-family: 'Lato';
    font-style: normal;
    margin-bottom: 18px;
    color: #FFFFFF;
    
    .name{
        display:flex;
        justify-content:space-between;
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
const LikeDiv = styled.div`
    position: absolute;
    top: 70px;
    
    svg{
        width: 44px;
        height: 44px;
        color: ${props => props.boolean ? "red" : "white"};
    }
    p{
        font-size: 12px;
        margin-left: 5px;
    }
`