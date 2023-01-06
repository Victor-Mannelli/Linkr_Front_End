import axios from "axios";

const BASE_URL ="http://localhost:5000";


export function postUrl(post,token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const promise = axios.post(`${BASE_URL}/post`, post, config);
    return promise;
}

export function getPosts(token){
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const promise = axios.get(`${BASE_URL}/post`, config);
    return promise;
}

export function postHashtag(hashtag) {
    const promise = axios.post(`${BASE_URL}/trend`, hashtag);
    return promise;
}
