import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
    parentSafeView:{
        flex:1,
    },
    parentView:{
        flex:1,
    },
    logo:{
        paddingTop:'20%', 
        justifyContent:'center', 
        alignItems:'center',
    },
    title:{
        fontSize:30, 
        paddingTop:'5%'
    },
    parentTextInput:{
        margin:'5%'
    },
    emailTextField:{
        marginTop:'1%'
    },
    button: {
        paddingLeft: '5%',
        justifyContent: 'center',
        width: '95%',
    },
    buttonForgot: {
        justifyContent: 'center',
        width: '95%',
        alignItems: 'baseline',
    },
    labelForgot:{
        fontSize: 10, 
        color: '#000',
    }
})