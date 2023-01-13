import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CreateConfig } from "../../service/config";
import { DataContext } from "../../context/auth";
import { toast } from "react-toastify";
import CardPost from "./cardPost";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import useInterval from "use-interval";
import dayjs from 'dayjs';
import { warning } from "@remix-run/router";

export default function Posts({ trend }) {
	const config = CreateConfig();
	const [followBool, setFollowBool] = useState(false);
	const [posts, setPosts] = useState([]);
	const [trends, setTrends] = useState([]);
	const { isPosted } = useContext(DataContext);
	const { token } = useContext(DataContext);
	
	const[loading, setLoading] = useState(false);
	const[hasMore, setHasMore] = useState(true);
	const[totalCount,setTotalCount] = useState(0);
	const[offset, setOffset] = useState(0);
	const[warning, setWarning] = useState(false);
	const[refresh, setRefresh] = useState(false);
	const[numberNewPosts,setNumberNewPOsts] = useState(0);
	const[allPosts,SetAllPosts] = useState([]);
	const[allTrends,SetAllTrends] = useState([]);

	useEffect(() => {
		const configPost = {
			headers: {
				Authorization: `Bearer ${token}`,
				limit:10,
				offset:0
			},
		};

		if (!trend) {
			setHasMore(true);
			setLoading(true);
			setTotalCount(0);

			const fetchTimeline = async ()=>{
				try{
					setLoading(true);
					const arrayPosts = (await axios.get(`${process.env.REACT_APP_API}/post`, config)).data;
					SetAllPosts(arrayPosts);
					const response = (await axios.get(`${process.env.REACT_APP_API}/post`, configPost)).data;
					setPosts(response);
					setLoading(false);
					setOffset(response.length)
					let array = response
					array = array.filter((item)=>item.hasfollow === true)
					if (array.length > 0) {
						setFollowBool(true)
						console.log(array)
					}else{
						setFollowBool(false)
						console.log(array.length)
					}
					if(response.length===0){
						setHasMore(false);
					}
				}
				catch(error){
					setHasMore(false)
					setLoading(false)
					toast.error(
						"An error occured while trying to fetch the posts, please refresh the page",
						{
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
						}
					);
				}
			}
			fetchTimeline();
		} else {
			const SearchTrend = async () => {

				try{
					const arraytrends = (await axios.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, config)).data;
					console.log(arraytrends);
					const requisicao = await axios.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, configPost);
					const dataArray = requisicao.data;
                    console.log(dataArray);
                    setTrends(dataArray);
					setOffset(dataArray.length)
					SetAllTrends(arraytrends);
					if(dataArray.length===0){
						setHasMore(false);
					}
				}catch(error){
					console.log(error)
                    toast.error(
						"An error occured while trying to fetch the posts, please refresh the page",
						{
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "colored",
						}
					);
				}
            }
            SearchTrend()
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trend, isPosted, refresh]);

	async function loadPosts(){
		if(!trend){
			try{
				const configPost = {
					headers: {
						Authorization: `Bearer ${token}`,
						limit:10,
						offset
					},
				}
				const newResponse = (await axios.get(`${process.env.REACT_APP_API}/post`, configPost)).data;
				setLoading(false);
	
				setPosts([...posts, ...newResponse]);
				if (newResponse.length === 0) {
					setHasMore(false);
				}
				setOffset(offset+newResponse.length);
	
			}catch(error){
				setLoading(false)
				console.log(error)
				toast.error(
					"An error occured while trying to fetch the posts, please refresh the page",
					{
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					}
				);
			}
		}else{
			try{
				const configPost = {
					headers: {
						Authorization: `Bearer ${token}`,
						limit:10,
						offset
					},
				}
				const newResponse = (await axios.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, configPost)).data;
				setLoading(false);
	
				setTrends([...trends, ...newResponse]);
				if (newResponse.length === 0) {
					setHasMore(false);
				}
				setOffset(offset+newResponse.length);
	
			}catch(error){
				setLoading(false)
				console.log(error)
				toast.error(
					"An error occured while trying to fetch the posts, please refresh the page",
					{
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					}
				);
			}			
		}

	}
	useInterval(async()=>{
		if (trends.length==0){
			try{
				const newPosts = (await axios.get(`${process.env.REACT_APP_API}/post`, config)).data;
				if(newPosts.length > allPosts.length){
					setWarning(true);
					const subtraction = newPosts.length - allPosts.length
					setNumberNewPOsts(subtraction);
					SetAllPosts(newPosts);
				}
			}catch(error){
				console.log("An error occured while trying to fetch the posts, please refresh the page")
			}
	
		}else{
			try{
				const newTrends = (await axios.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, config)).data;
				console.log(newTrends)
				console.log(allTrends)
				if(newTrends.length > allTrends.length){
					setWarning(true);
					const subtraction = newTrends.length - allTrends.length
					setNumberNewPOsts(subtraction);
					SetAllTrends(newTrends);
				}
			}catch(error){
				console.log("An error occured while trying to fetch the posts, please refresh the page")
			}
	
		}
	},15000);

	const VerifyPosts = () => {
		if (posts == null) {
			return "...Loading";
		}else if (posts.length === 0 && trends.length === 0 && !followBool) {
			return "You don't follow anyone yet. Search for new friends!";
		}else if(posts.length === 0 && trends.length === 0 ){
			return "No posts found from your friends";
		}else if(trends.length>0){
			return (
				trends.map((p, i) => (
				<CardPost
					key={i}
					id={p.id}
					obj={p}
					username={p.username}
					image={p.image}
					link={p.link}
					caption={p.caption}
					image_link={p.image_link}
					title={p.title}
					description={p.description}
					user_id={p.user_id}
				/>
			))
			);
		}
		else {
			return (
				posts.map((p, i) => (
				<CardPost
					key={i}
					id={p.id}
					obj={p}
					username={p.username}
					image={p.image}
					link={p.link}
					caption={p.caption}
					image_link={p.image_link}
					title={p.title}
					description={p.description}
					user_id={p.user_id}
				/>
			))
			);
		}
	};
	return( 
		<InfiniteScroll
		pageStart={0}
		loadMore={loadPosts}
		hasMore={hasMore}
		loader={<Loader>Loading more posts...</Loader>}
		>
		{warning?
		<Warning onClick= {()=>{
			setRefresh(!refresh)
			setWarning(false)
			}}>
			{`${numberNewPosts} new posts, load more!`}
		</Warning>:""}
		{VerifyPosts()}
		</InfiniteScroll>
	);
}

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
const Warning = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1877F2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  color:white;
  height: 61px;
  font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
`;
