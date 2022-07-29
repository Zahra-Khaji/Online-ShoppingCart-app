import axios from "axios";


axios.defaults.baseURL = "http://localhost:5000/api";

const http = {
    post:axios.post,
    get:axios.get,
    delete:axios.delete,
    put:axios.put
}

export default http;