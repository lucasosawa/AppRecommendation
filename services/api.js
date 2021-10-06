import axios from "axios";
import {getToken} from "../View/components/Auth";
import {Alert} from "react-native";
const api = axios.create({
    baseURL:"https://gdev-skills.herokuapp.com/api",
});

api.interceptors.response.use(
    async config =>{
        const token = getToken();
        if(token){
            config.headers.Authorization = `JWT ${token}`
        }
        return config;
    },

    error => {
        // Alert.alert{''}
    },
)
//
// api.interceptors.request.use(
//     config => {
//         return 'success'
//             // .then(user => {
//             //     user = JSON.parse(user)
//             //     if (user && user.token)
//             //         config.headers.Authorization = `Bearer ${user.token}`
//             //     return Promise.resolve(config)
//             // })
//             // .catch(error => {
//             //     console.log(error)
//             //     return Promise.resolve(config)
//             // })
//     },
//     error => {
//         return Promise.reject(error)
//     },
// )

export default api;