import styled from "styled-components";

export const LoginForm = styled.form`
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
		font-family: 'Oswald';
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