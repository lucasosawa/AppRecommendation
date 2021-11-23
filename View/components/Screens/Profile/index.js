import React, { useState, useEffect } from "react";
import { Button, View, SafeAreaView, ScrollView } from "react-native";
import {Avatar, Title, Caption, Text, TouchableRipple, TextInput} from 'react-native-paper'
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios'
import fetchDataLaravel from "../../../../helpers/API/fetchLaravel";

export default function Profile() {
    const [userShow, setUserShow] = useState()

    useEffect(() => {
        getUser()

        return () => {
            setUserShow(null)
        }
    }, [])

    const getUser = async () => {
        try {
            const userRequests = await axios.all([
                fetchDataLaravel(`users/authenticated`),
            ])
            setUserShow(userRequests[0]);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'grey'}}> 
            {userShow ?
                    <View style={{marginBottom:20, backgroundColor:'grey'}}>
                        <SafeAreaView>
                            <ScrollView>
                                <Title style={{color:'white', fontSize:20, marginLeft:15, marginTop:10}}>Perfil</Title>
                                <View>
                                    <TextInput label={'Nome'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.name}/>
                                    <TextInput label={'E-mail'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.email}/>
                                </View>
                                <View>
                                    <Title style={{color:'white', fontSize:20, marginLeft:15}}>Endereço</Title>
                                    <View style={{flexDirection:'row'}}>
                                        <TextInput label={'Cidade'} style={{width:'31%', marginLeft:10, marginBottom:10}} value={userShow.address.city}/>
                                        <TextInput label={'Estado'} style={{width:'31%', marginLeft:10, marginBottom:10}} value={userShow.address.state}/>
                                        <TextInput label={'Cep'} style={{width:'28%', marginLeft:10, marginBottom:10}} value={userShow.address.zipCode}/>
                                    </View>
                                    <TextInput label={'Bairro'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.address.district}/>
                                    <View style={{flexDirection:'row'}}>
                                        <TextInput label={'Rua'} style={{width:'70%', marginLeft:10, marginBottom:10}} value={userShow.address.street}/>
                                        <TextInput label={'Numero'} style={{width:'22%', marginLeft:10, marginBottom:10}} value={userShow.address.number}/>
                                    </View>
                                    
                                </View>
                                {userShow.typeUser == 2 ? (
                                    <View>
                                        <Title style={{color:'white', fontSize:20, marginLeft:15}}>Sobre</Title>
                                        <TextInput label={'Idade'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.age}/>
                                        <TextInput label={'Interesses'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.interest}/>
                                        <TextInput label={'Sobre'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.about}/>
                                        <TextInput label={'Historico escolar'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.academicEducation}/>
                                        <TextInput label={'Marcos de carreira'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.highlights}/>
                                        <TextInput label={'Habilidades'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.skills}/>
                                        <TextInput label={'Historico profissional'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.professionalHistory}/>
                                        <TextInput label={'GitHub'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.gitHub}/>
                                    </View>
                                ) : null}
                                {userShow.typeUser == 4 ? (
                                    <View>
                                        <Title style={{color:'white', fontSize:20, marginLeft:15}}>Sobre</Title>
                                        <TextInput label={'Sobre'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.about}/>
                                        <TextInput label={'Categoria da empresa'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.category}/>
                                        <TextInput label={'Tamanho'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.size}/>
                                        <TextInput label={'Fundada'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.founded}/>
                                        <TextInput label={'Especialidade'} style={{width:'95%', marginLeft:10, marginBottom:10}} value={userShow.profile.specialty}/>
                                    </View>
                                ) : null}
                                <View style={{}}>
                                    <Button title={'Enviar'}></Button>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
            : <Text>Sem dados</Text> } 

        </View>
        
    );
}
