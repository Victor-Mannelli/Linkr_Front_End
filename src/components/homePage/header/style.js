import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RxMagnifyingGlass } from "react-icons/rx";

export const Header = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;

	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100vw;
	height: 72px;
	background: #151515;

	h1 {
		font-family: "Passion One";
		font-weight: 700;
		font-size: 49px;
		line-height: 54px;
		letter-spacing: 0.05em;
		color: #ffffff;
		padding-left: 30px;
	}
	a {
		text-decoration: none;
	}
`;
export const ProfilePicture = styled.img`
	width: 53px;
	height: 53px;
	margin: 0 30px 0 10px;
	border-radius: 26.5px;
	cursor: pointer;
`;
export const UpArrow = styled(IoIosArrowUp)`
	width: 25px;
	height: 25px;
	color: #ffffff;
	margin-bottom: 12px;
	cursor: pointer;
`;
export const DownArrow = styled(IoIosArrowDown)`
	width: 25px;
	height: 25px;
	color: #ffffff;
	margin-bottom: 12px;
	cursor: pointer;
`;
export const LogOutButton = styled.button`
	position: fixed;
	right: -20px;
	top: 72px;

	width: 150px;
	height: 47px;
	border-radius: 0px 0px 20px 20px;
	background: #171717;

	font-family: "Lato";
	font-weight: 700;
	font-size: 17px;
	line-height: 20px;
	letter-spacing: 0.05em;
	color: #fff;
	padding-right: 20px;
`;
export const SearchBar = styled.div`
	position: relative;
	width: 563px;
	height: 45px;
`;
export const Filter = styled.input`
	position: absolute;
	top: 0;
	right: 0;
	z-index: 2;

	width: 563px;
	height: 45px;
	padding: 0 15px 1px 15px;
	border-radius: 8px;
	background: #fff;
	outline: none;
	border: none;
	font-size: 19px;
	font-family: "Lato";
	line-height: 23px;
	color: #c6c6c6;

	::placeholder {
		font-size: 19px;
		font-family: "Lato";
		line-height: 23px;
		color: #c6c6c6;
	}
`;
export const SearchIcon = styled(RxMagnifyingGlass)`
	position: absolute;
	top: 0;
	right: 0;
	z-index: 2;

	width: 21px;
	height: 21px;
	margin: 12px;
	color: #c6c6c6;
	cursor: pointer;
`;
export const FilteredUsers = styled.div`
	position: absolute;
	top: 30px;
	right: 0;
	z-index: 1;

	display: flex;
	flex-direction: column;
    padding-top: 18px;

	height: ${(props) => (props.isNotCollapsed === true ? "205px" : "0px")};
	width: 100%;
	background: #e7e7e7;
	border-radius: 8px;
	overflow: hidden;
	transition: max-height 0.2s ease-out;
`;
export const UserInABar = styled.div`
	display: flex;
    align-items: center;
	padding: 30px 15px 30px 15px;
	height: 50px;
	width: 100%;
    border-radius: 25px;
    cursor: pointer;
    
    :hover {
        background: lightgray;
    }
	img {
		width: 40px;
		height: 40px;
        border-radius: 100%;
	}
	h1 {
		font-family: "Lato";
		font-size: 19px;
		line-height: 23px;
		color: #515151;
        padding-left: 15px;
	}
	div{
		font-family: "Lato";
		font-size: 19px;
		line-height: 23px;
		color: #515151;
        padding-left: 35px;

		display: flex;
		
	}
	svg{
		padding-top: 3px;
		width: 35px;
		height: 35px;
	}
	p{
		padding-top: 6px;
	}
`;
