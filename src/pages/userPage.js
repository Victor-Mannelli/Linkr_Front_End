import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HomeHeader from "../components/homePage/header/homeHeader";
import TrendsBox from "../components/trendsBox";
import CardPost from "../components/homePage/cardPost";
import { DataContext } from "../context/auth";

export default function UserPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [userPosts, setUserPosts] = useState([]);
	const { setIsSearch } = useContext(DataContext);
	setIsSearch(true)
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/user/${id}`)
			.then((e) => setUserPosts(e.data))
			.catch(() => navigate("/home"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	console.log(userPosts)

	return (
		<>
			<HomeHeader />
			<Main>
				<div>
					<PageTitle>
							<img src={userPosts[0]?.profile_picture} alt="profile_picture" />
							<h1> {userPosts[0]?.username}'s posts </h1>
					</PageTitle>
					{userPosts.map((e) => {
						return (
							<CardPost
								key={e.id}
								id={e.id}
								user_id={id}
								username={e.username}
								image={e.profile_picture}
								link={e.link}
								caption={e.caption}
								image_link={e.image_link}
								title={e.title}
								description={e.description}
							/>
						);
					})}
				</div>
				<TrendsBox  searchUser = {id}/>
			</Main>
		</>
	);
}

const Main = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 72px;
	min-height: 100vh;
	background: #333333;
`;
const PageTitle = styled.div`
	display: flex;
	align-items: center;
	height: 150px;

	h1 {
		font-size: 43px;
		font-weight: 700;
		font-family: "Oswald";
		line-height: 64px;
		color: #fff;
		padding-bottom: 10px;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 26.5px;
		margin: 0 20px 0 18px;
	}
`;