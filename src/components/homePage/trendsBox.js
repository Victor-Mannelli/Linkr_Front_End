import { useEffect, useState } from "react";
import {SectionStyle} from "../../styles/trendBoxStyle"
import  axios  from "axios";
import { CreateConfig } from "../../service/config"; 
import { useNavigate } from "react-router-dom";

export default function TrendsBox(){
    const navigate = useNavigate();
    const config = CreateConfig()
    const [trends, setTrends] = useState([])
    const tagStyle = {
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer'
    }
    useEffect(() => {

        const GetTrends = () => {

            const tratarSucesso = (res) => {
               
                const dataArray = res.data
                console.log(dataArray)
                setTrends(dataArray)
            }

            const tratarErro = (res) => {
                console.log(res)
                alert(res.message)
                //navigate("/")
                //window.location.reload()
            }

            const requisicao = axios.get(`${process.env.REACT_APP_API}/hashtag`, config);
            requisicao.then(tratarSucesso)
            requisicao.catch(tratarErro)
        }
        GetTrends();
    },[])

    const SearchTrend = (trend) => {
        navigate(`/hashtag/${trend.replace("#","")}`)
    }
    return(
        <SectionStyle>
            <h3>trending</h3>
            {trends.map( (item,i) => <p onClick={() => SearchTrend(item.trending_name)} key={i}> { "# " + item.trending_name.replace("#","")}</p>)}
        </SectionStyle>
    )
}