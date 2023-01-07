import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./style";
import { toast } from "react-toastify";
import Input from "../Input";
import { DataContext } from "../../context/auth";

export default function SignInForm() {
	const navigate = useNavigate();
	const { setToken } = useContext(DataContext);

	useEffect(() => {
		localStorage.getItem("token") !== null && navigate("/home");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [fetchData, setFetchData] = useState({
		email: "",
		password: "",
	});

	const formData = [
		{
			name: "email",
			placeholder: "e-mail",
			value: fetchData.email,
			type: "email",
		},
		{
			name: "password",
			placeholder: "password",
			value: fetchData.password,
			type: "password",
		},
	];

	function handleChanges(e) {
		setFetchData({ ...fetchData, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();

		axios
			.post(`${process.env.REACT_APP_API}/signin`, fetchData)
			.then(
				(e) => {
				setToken(e.data.token)
				localStorage.setItem("token", e.data.token)
				navigate("/home")
			})
			.catch((e) =>
				toast.error(e.response.data.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				})
			);
	}
	return (
		<>
			<LoginForm onSubmit={handleSubmit}>
				{formData.map((item, index) => (
					<Input
						key={index}
						name={item.name}
						placeholder={item.placeholder}
						value={item.value}
						type={item?.type}
						onChange={handleChanges}
					/>
				))}
				<button type="submit"> Log in </button>
			</LoginForm>
			<h1 onClick={() => navigate("/signup")}>
				{" "}
				First time? Create an account!{" "}
			</h1>
		</>
	);
}
