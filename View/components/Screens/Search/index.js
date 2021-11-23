import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import postDataLaravel from '../../../../helpers/API/fetchLaravel'
import axios from 'axios'
import { VagaContext } from '../../../../context/VagasContext'
import api from '../../../../helpers/API/api'

export default function index() {
    // Setting the tab in vagas screen
    const [vagasTab, setVagasTab] = useState(1)
    // Getting index from map function to pass to child component
    const [ data, setData ] = useState(null)
    const [ dataRole, setDataRole ] = useState('')
    const [ dataName, setDataName ] = useState('')
    // Showing the content from vagas
    const [ userlist, setUserList ] = useState([])

    const getDataUsersList = async () => {
        try {
            api.post('search/users').then((response) => {
                setUserList(response.data)
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmitVacancies = (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('role', dataRole); 
        form.append('name', dataName);
        try {
            api.post('search/users', form).then((response) => {
                setUserList(response.data)
            })
        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        getDataUsersList()
        return () => {
          setDataRole(null)
          setDataName(null)
          setUserList(null)
        }
    }, [])
        return (
            <SafeAreaView style={{backgroundColor: '#1c1b18', flex:1}}>
                <ScrollView>
                    <View>
                        {<>
                            <View style={{flexDirection:'row', marginLeft:5}}>
                                <TextInput onChangeText={(value) => {setDataRole(value)}} theme={{ colors: { primary: '#000'}}} mode={'outlined'} placeholder={"Pesquisar por tipo"} style={{width:'50%'}}/>
                                <TextInput onChangeText={(value) => {setDataName(value)}} theme={{ colors: { primary: '#000'}}} mode={'outlined'} placeholder={"Pesquisar por cargo"} style={{width:'50%'}}/>
                            </View>
                            <Button onPress={ (e) => { handleSubmitVacancies(e) } } style={{color:"white", marginTop: 20, marginLeft:10}}>Todos os usuários</Button>
                            {userlist && userlist.length > 0 ?
                                userlist.map((index, i) => {
                                    return(
                                        <>
                                            <View key={i.toString()} style={{ flexDirection: 'row',justifyContent:'space-between', alignItems:'center', marginBottom:20}} >
                                                <View style={{flexDirection: 'row' ,alignItems:'center', flex:1, marginTop:30, marginLeft:20, borderRadius:10, borderColor:'white'}}>
                                                    <Text style={{color:"grey", width:'80%', height:40, fontSize:15, fontWeight: 'bold'}}>Nome do usuário: {index.name}</Text>
                                                    <Text style={{color:"grey", width:'80%', height:40, fontSize:15, fontWeight: 'bold'}}>Cargo do usuário: {index.role}</Text>
                                                </View>
                                            </View>
                                        </>
                                    )
                                })
                            :
                                ''
                            }
                        </>}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }