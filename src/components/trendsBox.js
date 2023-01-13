import { useEffect, useState, useContext } from "react";
import { SectionStyle, SideDiv } from "../styles/trendBoxStyle";
import axios from "axios";
import { CreateConfig } from "../service/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../context/auth";

export default function TrendsBox({ searchUser }) {
	const navigate = useNavigate();
	const config = CreateConfig();
	const [trends, setTrends] = useState([]);
	const [isClicked, setClick] = useState(false);
	const [disable, setDisable] = useState(false);
	const { isSearching,token } = useContext(DataContext);
	const [isFollower, setFollow] = useState({});

	useEffect(() => {
		const GetTrends = () => {
			const tratarSucesso = (res) => {
				const dataArray = res.data;

				setTrends(dataArray);
			};

			const tratarErro = (res) => {

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
			};

			const requisicao = axios.get(
				`${process.env.REACT_APP_API}/hashtag`,
				config
			);
			requisicao.then(tratarSucesso);
			requisicao.catch(tratarErro);
		};
		GetTrends();
	}, []);

	const SearchTrend = (trend) => {
		navigate(`/hashtag/${trend.replace("#", "")}`);
	};
	const Follow = () => {
		const x = !isClicked
		setClick(x)
		setDisable(true)
		if (isClicked) {
			const unFollow = () => {
				const configs = {
					headers: {
						Authorization: `Bearer ${token}`,
						follow_id: searchUser
					}
				}
				const tratarSucesso = (res) => {
					setDisable(false)
				};
	
				const tratarErro = (res) => {
					console.log(res);
					setDisable(false)
					toast.error("Não Foi possível Executar a Operação", {
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
				};
	
				const requisicao = axios.delete(
					`${process.env.REACT_APP_API}/follow`,
					configs
				);
				requisicao.then(tratarSucesso);
				requisicao.catch(tratarErro);
			};
			unFollow();
			
		}else{
			const InsertFollow = () => {

				const configs = {
					follow_id: searchUser
				}
				const tratarSucesso = (res) => {
					console.log(res)
					setDisable(false)
				};
	
				const tratarErro = (res) => {
					console.log(res);
					setDisable(false)
					toast.error("Não Foi possível Executar a Operação", {
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
				};
	
				const requisicao = axios.post(
					`${process.env.REACT_APP_API}/follow`,
					configs,config
				);
				requisicao.then(tratarSucesso);
				requisicao.catch(tratarErro);
			};
			InsertFollow();
		}
		
	}

	useEffect(() => {
		
			const GetFollow = () => {
				const {Authorization} = config.headers

				const configs = {
					headers: {
						Authorization: `Bearer ${token}`,
						follow_id: searchUser
					}
				}

				const tratarSucesso = (res) => {
					const dataObj = res.data;

					setFollow(dataObj);
					if (dataObj.areFollower && !isClicked) {
						const bool = !isClicked
						setClick(bool)
					}
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
					//navigate("/")
					//window.location.reload()
				};

				const requisicao = axios.get(
					`${process.env.REACT_APP_API}/follow`,
					configs
				);
				requisicao.then(tratarSucesso);
				requisicao.catch(tratarErro);
			
			
		}
		GetFollow();
	}, [isSearching]);

	return (
		<SideDiv boolean={isSearching} click={isClicked}>
			<button disabled={disable} onClick={Follow}>{isClicked ? "Unfollow" : "Follow"}</button>
			<SectionStyle>
				<h3>trending</h3>
				{trends.map((item, i) => (
					<p onClick={() => SearchTrend(item.trending_name)} key={i}>
						{" "}
						{"# " + item.trending_name.replace("#", "")}
					</p>
				))}
			</SectionStyle>
		</SideDiv>

	);
}
