import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export default function SignUpForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [picture, setPicture] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const userData = {
			email,
			password,
			username,
			picture,
		};
		axios
			.post("http://localhost:5000/signup", userData)
			.then((e) => {navigate("/"); localStorage.setItem("token", e.token)})
            .catch(
				(e) => console.log(e)
				// toast.error("ERROR MESSAGE" , {
				// 	position: "top-center",
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: "colored",
				// })
			);
	}
	return (
		<>
			<RegistrationForm onSubmit={handleSubmit}>
				<input
					placeholder="e-mail"
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					placeholder="password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input
					placeholder="username"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					placeholder="picture url"
					type="url"
					onChange={(e) => setPicture(e.target.value)}
					required
				/>

				<button type="submit"> Sign Up </button>
			</RegistrationForm>
			<h1 onClick={() => navigate("/")}> Switch back to log in </h1>
		</>
	);
}
const RegistrationForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 10px;
	input,
	button {
		width: 80%;
		height: 65px;
		border-radius: 6px;
		border: none;

		font-size: 27px;
		font-weight: 700;
		line-height: 40px;
		/* font-family: 'Oswald'; */
	}
	input {
		background: #fff;
		color: #9f9f9f;
		outline: none;
		padding: 0 15px;
	}
	button {
		background: #1877f2;
		color: #fff;
		:hover {
			background: #1865f2;
		}
	}
`;
