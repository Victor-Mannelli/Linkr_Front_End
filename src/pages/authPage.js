import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SignInForm from "../components/authPage/signInForm";
import SignUpForm from "../components/authPage/signUpForm";

export default function AuthPage() {
	const location = useLocation();
	return (
		<AuthorizationPage>
			<Banner>
				<h1> linkr </h1>
				<h2> save, share and discord <br /> the best links on the web </h2>
			</Banner>
			<AuthBar>
				{location.pathname === "/" && <SignInForm />}
				{location.pathname === "/signup" && <SignUpForm />}
			</AuthBar>
		</AuthorizationPage>
	);
}

const AuthorizationPage = styled.div`
	display: grid;
	grid-template-columns: 65% 35%;
	grid-template-rows: 100%;
	height: 100vh;
`;
const Banner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #151515;
	padding: 0 0 5% 10%;
	h1,
	h2 {
		font-weight: 700;
		color: #fff;
	}
	h1 {
		/* font-family: 'Passion One'; */
		font-size: 106px;
		line-height: 117px;
		letter-spacing: 0.05em;
	}
	h2 {
		/* font-family: "Oswald"; */
		font-size: 43px;
		line-height: 64px;
	}
`;
const AuthBar = styled.div`
	background: #333333;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	h1 {
		/* font-family: 'Lato'; */
		font-size: 20px;
		line-height: 24px;
		text-decoration: underline;
		color: #fff;
		cursor: pointer;
	}
`;