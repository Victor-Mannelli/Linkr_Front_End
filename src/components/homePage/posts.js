import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CreateConfig } from "../../service/config";
import { DataContext } from "../../context/auth";
import { toast } from "react-toastify";
import CardPost from "./cardPost";

export default function Posts({ trend }) {
	const config = CreateConfig();
	const [posts, setPosts] = useState([]);
	const [trends, setTrends] = useState([]);
	const { isPosted } = useContext(DataContext);

	useEffect(() => {
		if (!trend) {
			axios
				.get(`${process.env.REACT_APP_API}/post`, config)
				.then((res) => setPosts(res.data))
				.catch(() => {
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
				});
		} else {
			axios
				.get(`${process.env.REACT_APP_API}/hashtag/${trend}`, config)
				.then((e) => {
					const dataArray = e.data;
					setTrends(dataArray);
				})
				.catch((error) => {
					toast.error(error.message, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trend, isPosted]);

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
			return posts.map((p, i) => (
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
			));
		}
	};
	return VerifyPosts();
}
