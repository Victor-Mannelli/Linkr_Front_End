import { useContext, useEffect, useState } from "react";
import {SectionStyle} from "../../styles/trendBoxStyle"

export default function TrendsBox(){
    const array = ['#foca','#Dog','#Poggers']

    return(
        <SectionStyle>
            <h3>trending</h3>
            {array.map( (item) => <p>{item}</p>)}
        </SectionStyle>
    )
}