import { StyleSheet } from "react-native"

export const loginStyles = (props) => StyleSheet.create({
    small:{
        width: '100%',
        backgroundColor: '#eee',
        aspectRatio: props.aspect
    },
    original:{
        width:'100%',
        aspectRatio: props.aspect
    },
})