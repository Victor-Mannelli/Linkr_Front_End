import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CreateConfig } from "../../service/config";
import { DataContext } from "../../context/auth";
import { toast } from "react-toastify";
import CardPost from "./cardPost";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";

export default function Posts({ trend }) {
	const config = CreateConfig();
	const [posts, setPosts] = useState([]);
	const [trends, setTrends] = useState([]);
	const { isPosted } = useContext(DataContext);
	const { token } = useContext(DataContext);
	
	const[loading, setLoading] = useState(false);
	const[hasMore, setHasMore] = useState(true);
	const[totalCount,setTotalCount] = useState(0);
	const[offset, setOffset] = useState(0);

	useEffect(() => {
		if (!trend) {
			setHasMore(true);
			setLoading(true);
			setTotalCount(0);

			const fetchTimeline = async ()=>{
				try{
					const configPost = {
						headers: {
							Authorization: `Bearer ${token}`,
							limit:10,
							offset:0
						},
					};
					setLoading(true);
					const response = (await axios.get(`${process.env.REACT_APP_API}/post`, configPost)).data;
					setPosts(response);
					setLoading(false);
					setOffset(response.length)
					
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
			const SearchTrend = () => {
                const tratarSucesso = (res) => {
               
                    const dataArray = res.data
                    console.log(dataArray)
                    setTrends(dataArray)
                }
    
                const tratarErro = (res) => {
                    console.log(res)
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
                    //navigate("/")
                    //window.location.reload()
                }
                const requisicao = axios.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, config);
                requisicao.then(tratarSucesso)
                requisicao.catch(tratarErro)
            }
            SearchTrend()
        }
        
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trend, isPosted]);

	async function loadPosts(){

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
			console.log("offset: "+offset);

		}catch(error){
			setLoading(false)
			console.log(error)
			toast.error(
				"Aconteceu um erro ao tentar carregar mais posts",
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

	const VerifyPosts = () => {
		if (posts == null) {
			return "...Loading";
		} else if (posts.length === 0 && trends.length === 0) {
			return "Você ainda não tem publicações";
		} else if (trends.length > 0) {
			return trends.map((p, i) => (
				<CardPost
					key={i}
					id={p.id}
					username={p.username}
					image={p.image}
					link={p.link}
					caption={p.caption}
					image_link={p.image_link}
					title={p.title}
					description={p.description}
					user_id={p.user_id}
				/>
			));
		} else {
			return (
				<InfiniteScroll
				pageStart={0}
				loadMore={loadPosts}
				hasMore={hasMore}
				loader={<Loader>Loading more posts...</Loader>}
			  	>
				{posts.map((p, i) => (
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
			))}
			</InfiniteScroll>
			);
		}
	};
	return VerifyPosts();
}

const Loader = styled.div`
  color: white;
  width: 100%;
  margin-bottom: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Lato;
  font-size: 22px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.05em;
`;