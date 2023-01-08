import { useContext} from "react";
import { DataContext } from "../context/auth";

export  function  CreateConfig(){
    const { token } = useContext(DataContext)
    //const token = "2a19cb2e-4a67-48df-8e3f-e22a8b31ba8b"

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return config
}
