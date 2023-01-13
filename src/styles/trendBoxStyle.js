import styled from "styled-components";

export const SectionStyle = styled.section`

	margin-left: 25px;
	background-color: #171717;
	color: white;
	width: 301px;
	height: 406px;

	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	border-radius: 16px;

	gap: 10px;

	h3 {
		font-weight: 700;
		font-size: 27px;
		font-family: "Oswald";
		border-bottom: 1px;
		border-style: solid;
		border-color: #484848;

		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;

		padding: 9px 16px;
	}
	p {
		padding-left: 16px;
		font-size: 19px;
		font-weight: 700;
	}

	@media (max-width: 614px) {
		display: none;
	}
`;

export const SideDiv = styled.div`
	margin-top: ${props=>props.boolean? '70px' : "150px"};
	display: flex;
	flex-direction: column;
	gap: 50px;

	button{
			width: 30%;
			height: 5%;
			margin-left: 160px;
			background-color: ${props=>props.click? '#FFFFFF' : "#1877F2"};

			border-radius: 5px;
			border-style: none;

			color: ${props=>props.click? '#1877F2' : "white"};
			font-weight: 700;

			display: ${props=>props.boolean? '' : "none"};
	}

	@media (max-width: 614px) {
		button{
			display:none;
	}
	}
`
