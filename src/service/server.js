import axios from "axios";

export function getPosts(config) {
    const promise = axios.get(`${process.env.REACT_APP_API}/post`, config);
    return promise;
}

export function deletePost(postId, config) {
    const promise = axios.delete(`${process.env.REACT_APP_API}/post/${postId}`, config);
    return promise;
}

export function updatePost(postId, body, config) {
    const promise = axios.patch(`${process.env.REACT_APP_API}/post/${postId}`, body, config);
    return promise;
}



