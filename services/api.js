import axios from "axios";

const instance = axios.create({
    baseURL:"https://gdev-skills.herokuapp.com/api"
});

export default instance;