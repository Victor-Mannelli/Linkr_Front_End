import { createContext, useState } from "react";

export const DataContext = createContext({});

export default function DataProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token") === null ? null : localStorage.getItem("token"));
	const [userObj, setUserObj] = useState({});
	const [isPosted, setIsPosted] = useState(false);
	return (
		<DataContext.Provider
			value={{ token, setToken, userObj, setUserObj, isPosted, setIsPosted }}
		>
			{children}
		</DataContext.Provider>
	);
}
