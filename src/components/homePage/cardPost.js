import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { DataContext } from "../../context/auth";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import Buttons from "./buttons";
import axios from "axios";
import linkpic from "../assets/link.jpeg";

export default function CardPost({
	username,
	image,
	link,
	caption,
	image_link,
	title,
	description,
	id,
	user_id
}) {
	const [boolLike, setboolLike] = useState(false);
	const [likeId, setLikeId] = useState("");
	const [disabled, setDisable] = useState(true);
	const [likes, setLikes] = useState([]);
	const [update, setUpdate] = useState(false);
	const [likePhrase, setPhrase] = useState("");
	const [itsMe, setMe] = useState(false);
	const { token } = useContext(DataContext);
	const navigate = useNavigate();
	const tagStyle = {
		color: "white",
		fontWeight: 700,
		cursor: "pointer",
	};

	const VerifyLikes = (array) => {
		const isMe = array.filter((item) => item.isyou === true);
		//console.log(isMe)
		//console.log(array)
		const bool = !boolLike;
		setPhrase("");
		if (update === false && isMe.length > 0) {
			setboolLike(bool);
		}
		if (isMe.length > 0) {
			setLikeId(isMe[0].id);

			setMe(true);
			let x = likePhrase;
			if (array.length === 1) {
				console.log("1");
				x = "Você";
			} else if (array.length === 2) {
				console.log("2");
				const name = array[1].id !== isMe[0].id ? array[1].name : array[0].name;
				x = "Você e " + name;
			} else {
				for (let i = 0; i < 3; i++) {
					const element = array[i].name;

					if (i === 0 && !array[i].isyou) {
						x = x + "Você";
					} else if (i === 1 && array[i].isyou === false) {
						x = x + "," + element;
					} else if (i === 2 || array[i].isyou === false) {
						x =
							x +
							` e outras  ${array.length - 2 === 0 ? "" : array.length - 2
							} pessoas`;
					} else {
					}
				}
			}

			console.log(x);
			setPhrase(x);
		} else if (array.length > 0) {
			let x = likePhrase;
			if (array.length === 1 && !array[0].isyou) {
				x = array[0].name;
			} else if (array.length === 2) {
				x = array[0].name + " e " + array[1].name;
			} else if (array.length === 1) {
				x = "Você";
			} else {
				for (let i = 0; i < 3; i++) {
					const element = array[i].name;

					if (i === 1 && !array[i].isyou) {
						x = x + element;
					} else if (i === 2 && !array[i].isyou) {
						x = x + "," + element;
					} else if (!array[i].isyou) {
						x =
							x +
							`e outras  ${array[0].count - 2 === 0 ? "" : array[0].count - 2
							} pessoas`;
					} else {
						i--;
					}
				}
			}
			console.log(x);
			setPhrase(x);
		}
	};

	const ClickLike = () => {
		const bool = !boolLike;
		setboolLike(bool);
		setPhrase("");
		if (disabled) {
			if (bool) {
				setDisable(false);
				const PostLike = () => {
					const config = {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					};
					const body = {
						post_id: id,
					};
					const tratarSucesso = (res) => {
						const dataArray = res;
						console.log(dataArray);
						setLikeId(res.data.id);
						setUpdate("bool");
						setDisable(true);
					};

					const tratarErro = (res) => {
						console.log(res);
						toast.error(res.message, {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
						});
						setDisable(true);
						//navigate("/")
						//window.location.reload()
					};

					const requisicao = axios.post(
						`${process.env.REACT_APP_API}/likes`,
						body,
						config
					);
					requisicao.then(tratarSucesso);
					requisicao.catch(tratarErro);
				};
				PostLike();
			} else {
				setDisable(false);
				const DelLike = () => {
					console.log(likeId);
					const config = {
						headers: {
							Authorization: `Bearer ${token}`,
							id: likeId,
						},
					};
					const tratarSucesso = (res) => {
						const dataArray = res.data;
						console.log(dataArray);
						setUpdate("update");
						setDisable(true);
					};

					const tratarErro = (res) => {
						console.log(res);
						toast.error(res.message, {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
						});
						setDisable(true);
						//navigate("/")
						//window.location.reload()
					};

					const requisicao = axios.delete(
						`${process.env.REACT_APP_API}/likes`,
						config
					);
					requisicao.then(tratarSucesso);
					requisicao.catch(tratarErro);
				};
				DelLike();
			}
		}
	};
	useEffect(() => {

		const GetLikes = () => {

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					post_id: id
				}
			}

			const tratarSucesso = (res) => {
				//console.log(res)
				const dataArray = res.data
				VerifyLikes(dataArray)
				setLikes(dataArray)
			}

			const tratarErro = (res) => {
				console.log(res)
				toast.error(res.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
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
			return 0 + " likes";
		} else {
			console.log(likes.length);
			return Number(likes.length) === 1
				? likes.length + "like"
				: Number(likes.length) + " likes";
		}
	};

	function openWindow(url) {
		window.open(url);
	}

	return (
		<Card>
			<ProfilePicture
				onClick={() => navigate(`/user/${user_id}`)}
				className="perfil"
				src={image}
				alt="profile"
			/>

			<LikeDiv id={id} boolean={boolLike}>
				{!boolLike ? (
					<AiOutlineHeart onClick={ClickLike} />
				) : (
					<AiFillHeart onClick={ClickLike} />
				)}
				<p>{displayLike()}</p>
			</LikeDiv>

			<Tooltip
				place="bottom"
				style={{ backgroundColor: "white", color: "black" }}
				anchorId={id}
				content={likePhrase}
			/>

			<div className="column">
				<div className="name">
					<h1 onClick={() => navigate(`/user/${user_id}`)}> {username} </h1>
					{/* <Buttons id={id} newCaption={newCaption} /> */}
					<Buttons id={id} />
				</div>
				
				<div className="caption">
					<ReactTagify
						tagStyle={tagStyle}
						tagClicked={(tag) => navigate(`/hashtag/${tag.replace("#", "")}`)}
					>
						{caption}
					</ReactTagify>
				
				</div>
				<div className="link" onClick={() => openWindow(link)}>
					<div className="texto">
						<h1>{title}</h1>
						<p className="description">{description}</p>
						<p className="url">{link}</p>
					</div>
					{image_link ? (
						<HyperLinkImage src={image_link} alt="url_picture" />
					) : (
						<img src={linkpic} alt="url_picture" />
					)}
				</div>
			</div>
		</Card>
	);
}
const Card = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	background: #171717;
	height: 276px;
	border-radius: 16px;
	padding: 18px;
	position: relative;
	font-family: "Lato";
	font-style: normal;
	margin-bottom: 18px;
	color: #ffffff;

	.name {
		display: flex;
		justify-content: space-between;
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		margin-top: 5px;
		cursor: pointer;
	}
	.caption {

		color: #b7b7b7;
		font-style: normal;
		font-weight: 400;
		font-size: 17px;
		line-height: 20px;
		line-break: normal;
	}
	.perfil {
		width: 50px;
		height: 50px;
		border-radius: 26.5px;
	}
	.title {
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #cecece;
	}
	p {
		font-style: normal;
		font-weight: 400;
		font-size: 11px;
		line-height: 13px;
		line-break: normal;
	}
	.description {
		color: #9b9595;
		overflow: hidden; // Removendo barra de rolagem
        text-overflow: ellipsis; // Adicionando "..." ao final
        display: -webkit-box;
        -webkit-line-clamp: 3; // Quantidade de linhas
        -webkit-box-orient: vertical; 
        word-break: break-all;
	}
	.img{
		width: 153.44px;
        height: 155px;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
	}
	.url {
		color: #cecece;
		color: #CECECE;
        white-space: nowrap; // Removendo quebra de linha
        overflow: hidden; // Removendo a barra de rolagem
        text-overflow: ellipsis; // Adicionando "..." 
	}
	.column {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		width: 90%;
		padding-left: 15px;

		div {
			width: 100%;
			padding-left: 10px;
		}
	}
	.link {
		width: 100%;
		height: 155px;
		display: flex;
		border: 1px solid #4d4d4d;
		border-radius: 11px;
		color: #b7b7b7;
		cursor: pointer;
	}
	.texto {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding: 10px;
	}
	@media (max-width: 614px) {
		border-radius: 0px;
		height: 232px;
		img {
			max-width: 95px;
			max-height: 115px;
		}
		.link {
			max-height: 115px;
		}
		.texto {
			padding: 5px;
		}
		.url {
			max-width: 120px; // Limite maximo do texto
		}
	}
`;
const LikeDiv = styled.div`
	position: absolute;
	top: 80px;

	svg {
		width: 44px;
		height: 44px;
		color: ${(props) => (props.boolean ? "red" : "white")};
	}
	p {
		font-size: 12px;
		margin-left: 5px;
	}
`;
const HyperLinkImage = styled.img`
	width: 153.44px;
	height: 155px;
	border-radius: 0px 12px 13px 0px;
	cursor: pointer;
`;
const ProfilePicture = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 26.5px;
	cursor: pointer;
`;
