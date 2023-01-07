import axios from "axios";

export function postUrl(post,token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const promise = axios.post(`${process.env.REACT_APP_API}/post`, post, config);
    return promise;
}

export function getPosts(token){
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const promise = axios.get(`${process.env.REACT_APP_API}/post`, config);
    return promise;
}

export function postHashtag(hashtag) {
    const promise = axios.post(`${process.env.REACT_APP_API}/trend`, hashtag);
    return promise;
}
