import axios from "axios";
import {getToken} from '../../View/components/Screens/Auth'
import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('userToken')
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
        error => {
        return Promise.reject(error)
    }
);

export default api;