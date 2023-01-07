import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "./style";
import { toast } from "react-toastify";
import Input from "../Input";

export default function SignUpForm() {
	const navigate = useNavigate();

	const [fetchData, setFetchData] = useState({
		email: "",
		password: "",
		username: "",
		profile_picture: "",
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
		{
			name: "username",
			placeholder: "username",
			value: fetchData.username,
		},
		{
			name: "profile_picture",
			placeholder: "picture url",
			value: fetchData.profile_picture,
		},
	];

	function handleChanges(e) {
		setFetchData({ ...fetchData, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();

		axios
			.post(`${process.env.REACT_APP_API}/signup`, fetchData)
			.then(
				(e) =>{
					toast.success(e.response.data.message, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					})
				navigate("/")
				console.log("aqui")
			}
			)
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
			<RegistrationForm onSubmit={handleSubmit}>
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
				<button type="submit"> Sign Up </button>
			</RegistrationForm>
			<h1 onClick={() => navigate("/")}> Switch back to log in </h1>
		</>
	);
}
