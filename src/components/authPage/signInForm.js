import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export default function SignInForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    if (localStorage.getItem("token") !== null) navigate("/home")

	function handleSubmit(e) {
		e.preventDefault();
		const userData = {
			email,
			password,
		};
		axios
			.post("http://localhost:5000/signin", userData)
			.then(() => navigate("/home"))
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
			<LoginForm onSubmit={handleSubmit}>
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
				<button type="submit"> Log In </button>
			</LoginForm>
			<h1 onClick={() => navigate("/signup")}>
				{" "}
				First time? Create an account!{" "}
			</h1>
		</>
	);
}
const LoginForm = styled.form`
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
