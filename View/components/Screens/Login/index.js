import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, StyleSheet,  TouchableOpacity, placeholderTextColor} from 'react-native'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { loginStyles } from './styles'
import { AuthContext } from '../../../../helpers/authentication/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default class index extends Component {

    static contextType = AuthContext

    constructor(props){
        super(props)

        this.state = {emailError : false, emailValue: '', passwordError: false, passwordValue: ''}
    }

    loginButtonPressed = () => {

        if(this.state.emailValue == '' ){
            this.setState({
                emailError : true
            })
        }
        else{
            this.setState({
                emailError : false
            })          
        }

        if(this.state.passwordValue == '' ){
            this.setState({
                passwordError : true
            })
        }
        else{
            this.setState({
                passwordError : false
            })
        }

        if(this.state.emailValue != null && this.state.passwordValue != ''){
            
            AsyncStorage.setItem('userToken', "123456")
            this.context.signIn(this.state.emailValue, this.state.passwordValue)
            
        }
    }

    EmailValueChanged = (text) =>{
        this.setState({
            emailValue : text
        })
        this.validateEmail(text)
    }

    PasswordValueChanged = (text) =>{
        this.setState({
            passwordValue : text
        })
        this.validatePassword(text)
    }

    validateEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            this.setState({
                emailError : true
            })
        }
        else {
            this.setState({
                emailError : false
            })
        }
    }

    validatePassword = (password) => {
        let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (reg.test(password) === false) {
            this.setState({
                passwordError : true
            })
        }
        else {
            this.setState({
                passwordError : false
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={loginStyles.parentSafeView}>
                <View style={loginStyles.parentView}>
                    <View style={loginStyles.logo}>
                        <Image source={require('../../../../src/assets/download.png')}/>
                        <Text style={loginStyles.title}>GDevSkills</Text>
                    </View>
                    <View style={loginStyles.parentTextInput}>
                        <TextInput style={loginStyles.emailTextField} theme={{ colors: { primary: '#000'}}} label='Email' placeholder={"E-mail"} mode={'outlined'} error={this.state.emailError} value={this.state.emailValue} onChangeText={this.EmailValueChanged} ></TextInput>
                        <HelperText type="error" visible={this.state.emailError} padding>
                            Email is invalid!
                        </HelperText>
                        <TextInput theme={{ colors: { primary: '#000'}}} secureTextEntry={true} label='Password' placeholder={"Password"} mode={'outlined'} value={this.state.passwordValue} error={this.state.passwordError} onChangeText={this.PasswordValueChanged}></TextInput>
                        <HelperText type="error" visible={this.state.passwordError} padding={"none"}>
                            Password is invalid!
                        </HelperText>
                        <TouchableOpacity style={loginStyles.buttonForgot} >
                            <Button labelStyle={loginStyles.labelForgot} mode="text" color="#000">Forgot your password</Button>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={loginStyles.button} onPress={this.loginButtonPressed}>
                            <Button mode="contained" color="#7bdbbe" marginTop="1%">Sign in</Button>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={loginStyles.button}>
                            <Button mode="contained" color="#7bdbbe" marginTop="3%">Sign up</Button>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            </SafeAreaView>
        )
    }
}