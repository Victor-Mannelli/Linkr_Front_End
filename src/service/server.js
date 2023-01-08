import axios from "axios";

export function postUrl(post,config) {
    const promise = axios.post(`${process.env.REACT_APP_API}/post`, post, config);
    return promise;
}

export function getPosts(config){
    const promise = axios.get(`${process.env.REACT_APP_API}/post`, config);
    return promise;
}
