import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../../helpers/API/api'


export async function login(token){
    try {
        // console.log(token)
        return await AsyncStorage.setItem('userToken', JSON.stringify(token));
    }catch (e){
        throw e;
    }
}

export const getToken = async ()=>{
    return await AsyncStorage.getItem('userToken');
}

export async function logout(){
    await api.post('auth/logout')
    return await AsyncStorage.removeItem('userToken')
}

export async function isAuthenticated(){
    return await AsyncStorage.getItem('userToken') !== null
}