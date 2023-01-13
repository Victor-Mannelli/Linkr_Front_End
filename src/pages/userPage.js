import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HomeHeader from "../components/homePage/header/homeHeader";
import TrendsBox from "../components/trendsBox";
import CardPost from "../components/homePage/cardPost";
import { DataContext } from "../context/auth";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [userPosts, setUserPosts] = useState([]);
	const { setIsSearch } = useContext(DataContext);
	setIsSearch(true)

	const[hasMore, setHasMore] = useState(true);
	const[offset, setOffset] = useState(0);

	useEffect(() => {
		const configPost = {
			headers: {
				limit:10,
				offset:0
			},
		};
		const fetchUserPost = async ()=>{
			try{
				const response = (await axios.get(`${process.env.REACT_APP_API}/user/${id}`, configPost)).data
				setUserPosts(response);
				setOffset(response.length)
				if(response.length===0){
					setHasMore(false);
				}
			}catch{
				navigate("/home")
			}

		}
		fetchUserPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	console.log(userPosts)

	async function loadPosts(){
			try{
				const configPost = {
					headers: {
						limit:10,
						offset
					},
				}
				const newResponse = (await axios.get(`${process.env.REACT_APP_API}/user/${id}`, configPost)).data;

				setUserPosts([...userPosts, ...newResponse]);
				if (newResponse.length === 0) {
					setHasMore(false);
				}
				setOffset(offset+newResponse.length);
	
			}catch(error){
				console.log(error)
			}
	}	

	return (
		<>
			<HomeHeader />
			<Main>
				<div>
					<PageTitle>
							<img src={userPosts[0]?.profile_picture} alt="profile_picture" />
							<h1> {userPosts[0]?.username}'s posts </h1>
					</PageTitle>
					<InfiniteScroll
						pageStart={0}
						loadMore={loadPosts}
						hasMore={hasMore}
						loader={<Loader>Loading more posts...</Loader>}
					>
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
					</InfiniteScroll>
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
	div{
		max-width: 611px;
	}
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
	@media (max-width: 614px) {
		margin-top: 20px;
	}
`;
const Loader = styled.div`
  width: 100%;
  margin-bottom: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.05em;
  color: #6D6D6D;
`;