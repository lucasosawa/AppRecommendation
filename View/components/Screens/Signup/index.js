import React, { Component, useState } from 'react'
import { Text, View, Image, SafeAreaView, TouchableOpacity, Alert, ScrollView} from 'react-native'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { loginStyles } from './styles'
import { AuthContext } from '../../../../helpers/authentication/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../../../helpers/API/api'
import {Picker} from '@react-native-picker/picker'
import { DropDown } from '../UpdateSignUp'
import { set } from 'react-native-reanimated'

export default class index extends Component {
    static contextType = AuthContext
    
    constructor(props){
        super(props)
        this.state = {
            nameValue:'',
            nameError: false,
            emailValue: '', 
            emailError : false, 
            passwordValue: '',
            passwordError: false, 
            telefoneValue: '',
            telefoneError: false, 
            confirmPasswordValue: '',
            confirmpasswordError: false,

            dropDownData: ''
        }

    }

    dropDownData = data => {
        this.setState({dropDownData:data})
        console.log(this.state.dropDownData);
    }
    
    SignUpPressed = async (props) => {
        if(this.state.nameValue != '' &&
           this.state.emailValue != '' && 
           this.state.passwordValue != '' &&
           this.state.confirmPasswordValue != '') {
            const form = new FormData();
            form.append('name', this.state.nameValue)
            form.append('email', this.state.emailValue)
            form.append('telephone', this.state.telefoneValue)
            form.append('password', this.state.passwordValue)
            form.append('typeUser', this.state.dropDownData)
            roleValue = this.state.dropDownData
            switch(roleValue) {
                case '2':
                    form.append('role', 'user')
                  break;
                case '3':
                    form.append('typeUser', 'contractor')
                  break;
                case '4':
                    form.append('typeUser', 'company')
                  break;
                default:
                  Alert.alert("Role not");
            }
           
            

            await api.post('users', form)
            .then((response) => {
                Alert.alert('Cadastrado com sucesso')
                setTimeout(() => {
                    this.props.navigation.navigate('LoginScreen')
                }, 3000);
            }).catch((error)=>{console.log(error)})
        }
    }

    NameValueChanged = (text) =>{
        this.setState({
            nameValue : text
        })
        this.validateName(text)
    }

    EmailValueChanged = (text) =>{
        this.setState({
            emailValue : text
        })
        this.validateEmail(text)
    }
    TelefoneValueChanged = (text) =>{
        this.setState({
            telefoneValue : text
        })
        // this.validateTelefone(text)
    }
    PasswordValueChanged = (text) =>{
        this.setState({
            passwordValue : text
        })
        this.validatePassword(text)
    }

    confirmPasswordValueChanged = (text) =>{
        this.setState({
            confirmPasswordValue: text
        })
        this.validateConfirmPassword(text)
    }

    validateName = (name) => {
        let reg = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
        if (reg.test(name) === false) {
            this.setState({
                nameError : true
            })
        }
        else {
            this.setState({
                nameError : false
            })
        }
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

    validateConfirmPassword = () => {
        if(this.state.passwordValue != this.state.confirmPasswordValue){
            this.setState({
                confirmpasswordError:true
            })
        }
        else{
            this.setState({
                confirmpasswordError:false
            })
        }
    }

    render() {
        return (
            <ScrollView>
            <SafeAreaView style={loginStyles.parentSafeView}>
                <View style={loginStyles.parentView}>
                    <View style={loginStyles.parentTextInput}>
                        <TextInput style={loginStyles.nameTextField} theme={{ colors: { primary: '#000'}}}  placeholder={"Nome"} mode={'outlined'} error={this.state.nameError} onChangeText={this.NameValueChanged} value={this.state.nameValue} ></TextInput>
                        <HelperText type="error" visible={this.state.nameError} padding>
                            Nome é invalido
                        </HelperText>
                        <TextInput style={loginStyles.emailTextField} theme={{ colors: { primary: '#000'}}}  placeholder={"E-mail"} mode={'outlined'} error={this.state.emailError} onChangeText={this.EmailValueChanged} value={this.state.emailValue}></TextInput>
                        <HelperText type="error" visible={this.state.emailError} padding>
                            Email é invalido
                        </HelperText>
                        <DropDown onChange={this.dropDownData}/>
                        <TextInput theme={{ colors: { primary: '#000'}}}  placeholder={"Telefone (DD)XXXXX-XXXX"} mode={'outlined'} error={this.state.telefoneError} onChangeText={this.TelefoneValueChanged} value={this.state.telefoneValue}></TextInput>
                        <HelperText type="error" visible={false} padding>
                            Telefone é invalido
                        </HelperText>
                        <TextInput theme={{ colors: { primary: '#000'}}} secureTextEntry={true} placeholder={"Senha"} mode={'outlined'} error={this.state.passwordError} onChangeText={this.PasswordValueChanged} value={this.state.passwordValue}></TextInput>
                        <HelperText type="error" visible={this.state.passwordError} padding={"none"}>
                            Password é invalido
                        </HelperText>
                        <TextInput theme={{ colors: { primary: '#000'}}} secureTextEntry={true} placeholder={"Confirmar senha"} mode={'outlined'} error={this.state.confirmpasswordError} onChangeText={this.confirmPasswordValueChanged} value={this.state.confirmPasswordValue}></TextInput>
                        <HelperText type="error" visible={this.state.validateConfirmPassword} padding={"none"}>
                            Password é invalido
                        </HelperText>
                    </View>
                    <View>
                        <TouchableOpacity style={loginStyles.button} >
                            <Button mode="contained" color="#7bdbbe" onPress={this.SignUpPressed} marginTop="3%">Sign up</Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            </ScrollView>
        )
    }
}