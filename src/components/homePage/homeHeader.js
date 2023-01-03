import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import pfpic from "../assets/cat.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomeHeader() {
	const [foldButton, setFoldButton] = useState(false);
	const navigate = useNavigate();

	axios.get("http://localhost:5000/auth").then((e) => console.log(e));

	return (
		<>
			<Header>
				<div>
					<h1> linkr </h1>
				</div>
				<div>
					{foldButton === false ? (
						<UpArrow onClick={() => setFoldButton(!foldButton)} />
					) : (
						<DownArrow onClick={() => setFoldButton(!foldButton)} />
					)}
					<img src={pfpic} alt="profile_picture" />
				</div>
			</Header>
			{foldButton === true && (
				<LogOutButton
					onClick={() => {
						navigate("/");
						localStorage.removeItem("token");
					}}
				>
					{" "}
					Logout{" "}
				</LogOutButton>
			)}
		</>
	);
}

const Header = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;

	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100vw;
	height: 72px;
	background: #151515;
	div {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-right: 15px;
	}
	h1 {
		font-family: "Passion One";
		font-weight: 700;
		font-size: 49px;
		line-height: 54px;
		letter-spacing: 0.05em;
		color: #ffffff;
		padding-left: 30px;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 26.5px;
	}
`;
const UpArrow = styled(IoIosArrowUp)`
	width: 25px;
	height: 25px;
	color: #ffffff;
	cursor: pointer;
`;
const DownArrow = styled(IoIosArrowDown)`
	width: 25px;
	height: 25px;
	color: #ffffff;
	cursor: pointer;
`;
const LogOutButton = styled.button`
	position: fixed;
	right: -20px;
	top: 72px;

	width: 150px;
	height: 47px;
	border-radius: 0px 0px 20px 20px;
	background: #171717;

	font-family: "Lato";
	font-weight: 700;
	font-size: 17px;
	line-height: 20px;
	letter-spacing: 0.05em;
	color: #fff;
	padding-right: 20px;
`;
