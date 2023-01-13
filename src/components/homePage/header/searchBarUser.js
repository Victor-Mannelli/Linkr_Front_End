import { useNavigate } from "react-router-dom";
import { UserInABar } from "./style";
import { RxDotFilled } from 'react-icons/rx';

export default function SearchBarUser({ id, image, username ,isFollower}) {
	const navigate = useNavigate();
	console.log(isFollower)
	return (
		<UserInABar onClick={() => navigate(`/user/${id}`)}>
			<img src={image} alt="profile_picture" />
			<h1> {username} </h1>

			{isFollower? <div><RxDotFilled/><p>following</p></div>: ""}
		</UserInABar>
	);
}
