import axios from "axios";
import {getToken} from '../../View/components/Screens/Auth'
import {Alert} from "react-native";
const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/",
});

api.interceptors.response.use(async (config) =>{
        const token = getToken();
        console.log('Teste do token em API',token)
        if(token){
            config.headers.Authorization = `Bearer ${token}`
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