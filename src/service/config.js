import { useContext } from "react";
import { DataContext } from "../context/auth";

export  function  CreateConfig(){
    const { token } = useContext(DataContext)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

	return config;
}
