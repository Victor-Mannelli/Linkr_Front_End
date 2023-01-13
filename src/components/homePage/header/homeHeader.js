import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataContext } from "../../../context/auth";
import { CreateConfig } from "../../../service/config";
import {
	DownArrow,
	Filter,
	FilteredUsers,
	Header,
	LogOutButton,
	ProfilePicture,
	SearchBar,
	SearchIcon,
	UpArrow,
} from "./style";
import SearchBarUser from "./searchBarUser";

export default function HomeHeader() {
	const navigate = useNavigate();
	const config = CreateConfig();
	const { setUserObj, userObj } = useContext(DataContext);
	const { token } = useContext(DataContext);
	const [foldButton, setFoldButton] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [filter, setFilter] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/user`, config)
			.then((e) => {
				setUserObj(e.data);
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
				navigate("/");
			});

		axios
			.get(`${process.env.REACT_APP_API}/users`,config)
			.then((e) => setAllUsers(e.data))
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setFilteredUsers(allUsers.filter((e) => e.username.includes(filter)));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	function handleLogout() {
		axios
			.delete(`${process.env.REACT_APP_API}/logout`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(
				(e) =>
					toast.success(e.data.message, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					}),
				localStorage.removeItem("token"),
				navigate("/")
			);
	}

	return (
		<>
			<Header>
				<div>
					<Link to="/home">
						<h1> linkr </h1>
					</Link>
				</div>
				<SearchBar>
					<Filter
						type="text"
						placeholder="Search for people"
						onChange={(e) => setFilter(e.target.value)}
					/>
					<FilteredUsers isNotCollapsed={filter.length !== 0 && true}>
						{filteredUsers.map((e) => {
							return (
								<SearchBarUser
									key={e.id}
									id={e.id}
									image={e.profile_picture}
									username={e.username}
									isFollower={e.isfollower}
								/>
							);
						})}
					</FilteredUsers>
					<SearchIcon />
				</SearchBar>
				<div>
					{foldButton === false ? (
						<UpArrow onClick={() => setFoldButton(!foldButton)} />
					) : (
						<DownArrow onClick={() => setFoldButton(!foldButton)} />
					)}
					<ProfilePicture
						onClick={() => navigate(`/user/${userObj.id}`)}
						src={userObj.profile_picture}
						alt="profile_picture"
					/>
				</div>
			</Header>
			{foldButton === true && (
				<LogOutButton onClick={() => handleLogout()}> Logout </LogOutButton>
			)}
		</>
	);
}
