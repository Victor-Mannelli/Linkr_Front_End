import { useEffect, useState } from "react";
import {SectionStyle} from "../../styles/trendBoxStyle"
import { ReactTagify } from "react-tagify";
import  axios  from "axios";
import { CreateConfig } from "../../service/config"; 

export default function TrendsBox(){

    const config = CreateConfig()
    const [trends, setTrends] = useState([])
    const array = ['#foca','#Dog','#Poggers']
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
    return(
        <SectionStyle>
            <h3>trending</h3>
            {trends.map( (item,i) => <p key={i}><ReactTagify tagStyle={tagStyle}>{item.trending_name}</ReactTagify></p>)}
        </SectionStyle>
    )
}