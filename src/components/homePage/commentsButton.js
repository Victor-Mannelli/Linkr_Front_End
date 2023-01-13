import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { getTotalComments } from "../../service/server.js";

export default function CommentButton({ id, setIsCommentsOpen, isCommentsOpen }) {
    const [totalComments, setTotalComments] = useState(0);
  
    useEffect(() => {
        getTotalComments(id)
            .then((res) => {
                setTotalComments(res.data.length);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Wrapper>
            <AiOutlineComment
                style={iconComentStyle}
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            ></AiOutlineComment>
            <p>{totalComments} comments</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-left: -10px;
`;

const iconComentStyle = {
    color: "#FFFFFF",
    fontSize: "25px",
    cursor: "pointer",
};