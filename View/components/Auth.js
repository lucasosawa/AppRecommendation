import AsyncStorage from "@react-native-async-storage/async-storage";


export async function login(token){
    try {
        // console.log(token)
        return await AsyncStorage.setItem('token_user', JSON.stringify(token));
    }catch (e){
        throw e;
    }
}

export const getToken = async ()=>{
    return await AsyncStorage.getItem('token_user');
}

export async function logout(){
    return await AsyncStorage.removeItem('token_user')
}

export async function isAuthenticated(){
    return await AsyncStorage.getItem('token_user') !== null
}