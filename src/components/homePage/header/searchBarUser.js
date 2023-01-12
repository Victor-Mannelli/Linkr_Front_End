import { useNavigate } from "react-router-dom";
import { UserInABar } from "./style";

export default function SearchBarUser({ id, image, username }) {
	const navigate = useNavigate();
	return (
		<UserInABar onClick={() => navigate(`/user/${id}`)}>
			<img src={image} alt="profile_picture" />
			<h1> {username} </h1>
		</UserInABar>
	);
}
