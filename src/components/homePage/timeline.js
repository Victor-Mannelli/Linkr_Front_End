import styled from "styled-components";
import PostCreation from "./postCreation";
import Posts from "./posts";

export default function Timeline({ title }) {
	const boolean = !title ? true : false;
	return (
		<Container>
			{boolean ? (
				<div className="title"> timeline</div>
			) : (
				<div className="title"> # {title}</div>
			)}
			{boolean ? <PostCreation /> : ""}
			<Posts trend={title} />
		</Container>
	);
}
const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 50px;
	width: 611px;

	.title {
		width: 100%;
		margin-bottom: 40px;
		color: #ffffff;
		font-family: "Oswald";
		font-style: normal;
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
	}

	@media (max-width: 614px) {
		width: 100%;

		.title {
			margin-bottom: 20px;
			padding-left: 15px;
		}
	}
`;
