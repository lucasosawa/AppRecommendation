import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import Switch from './Switch'
import fetchDataLaravel from '../../../../helpers/API/fetchLaravel'
import axios from 'axios'
import { VagaContext } from '../../../../context/VagasContext'
import VagaDetail from './VagaDetail'

export default function Vaga() {
    // Setting the tab in vagas screen
    const [vagasTab, setVagasTab] = useState(1)
    // Getting index from map function to pass to child component
    const [ data, setData ] = useState(null)
    // Showing the content from vagas
    const { vagas } = useContext(VagaContext)
    const [getVagas, setVagas] = vagas
    
    const getData = async () => {
        try {
        const vagasRequests = await axios.all([
            fetchDataLaravel('user/pivotvacancie'),
        ])
            setVagas(vagasRequests[0]);
            console.log(vagasRequests[0]);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    
        return () => {
          setVagas(null)
        }
    }, [])

    const indexToModal = (value) => {
        setData(value);
    }

    const onSelectSwitch = (data) => {
        setVagasTab(data);
    }
        return (
            <SafeAreaView style={{backgroundColor: '#1c1b18', flex:1}}>
                <ScrollView>
                    <View>
                        <Switch selectionMode={1} option1="Todas as vagas" option2="Minhas vagas" onSelectSwitch={onSelectSwitch}/>
                        
                        {vagasTab == 1 && 
                        <>
                            <View style={{flexDirection:'row', marginLeft:5}}>
                                <TextInput theme={{ colors: { primary: '#000'}}} mode={'outlined'} placeholder={"Pesquisar por tipo"} style={{width:'50%'}}/>
                                <TextInput theme={{ colors: { primary: '#000'}}} mode={'outlined'} placeholder={"Pesquisar por cargo"} style={{width:'50%'}}/>
                            </View>
                            <Button style={{color:"white", marginTop: 20, marginLeft:10}}>Todas as vagas</Button>
                            {/* {
                                getVagas.map((index, i) => {
                                    console.log(index.vacancie.id);
                                    return(
                                        <>
                                            <View key={i.toString()} style={{ flexDirection: 'row',justifyContent:'space-between', alignItems:'center', marginBottom:20}} >
                                                <View style={{flexDirection: 'row' ,alignItems:'center', flex:1, marginTop:30, marginLeft:20, borderRadius:10, borderColor:'white'}}>
                                                    <Text style={{color:"grey", width:'80%', height:40, fontSize:15, fontWeight: 'bold'}}>Nome da vaga: {index.vacancie.title}</Text>
                                                </View>
                                            </View>
                                        </>
                                    )
                                })
                            } */}
                        </>
                        }
                        {vagasTab == 2 && 
                            getVagas.map((index, i) => {
                                console.log(index.vacancie.id);
                                return(
                                    <>
                                        <View key={i.toString()} style={{ flexDirection: 'row',justifyContent:'space-between', alignItems:'center', marginBottom:20}} >
                                            <View style={{flexDirection: 'row' ,alignItems:'center', flex:1, marginTop:30, marginLeft:20, borderRadius:10, borderColor:'white'}}>
                                                <Text style={{color:"grey", width:'80%', height:40, fontSize:15, fontWeight: 'bold'}}>Nome da vaga: {index.vacancie.title}</Text>
                                            </View>
                                            
                                        </View>
                                        <VagaDetail data={index.vacancie.id}/>
                                    </>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
