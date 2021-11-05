import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar:{
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    name:{
        fontWeight:"600",
    },
    description :{
        padding: 15,
        lineHeight: 18,
    },
    
})