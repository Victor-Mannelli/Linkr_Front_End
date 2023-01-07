import { createContext, useState } from "react";

export const DataContext = createContext({});

export default function DataProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token") === null ? null : localStorage.getItem("token"));

	return (
		<DataContext.Provider value={{ token, setToken }}>
			{children}
		</DataContext.Provider>
	);
}
