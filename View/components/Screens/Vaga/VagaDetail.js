import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import axios from 'axios'
import fetchDataLaravel from "../../../../helpers/API/fetchLaravel";

export default function VagaDetail(data) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [vacancieShow, setVacancieShow] = useState(null)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(data.data);

    const getVacancie = async () => {
        try {
            const vacancieRequests = await axios.all([
            fetchDataLaravel(`vacancies/${data.data}`),
        ])
            setVacancieShow(vacancieRequests[0]);
            console.log(vacancieRequests[0]);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getVacancie()

        return () => {
            setVacancieShow(null)
        }
    }, [])

  return (
    <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={toggleModal}
        style={{
            backgroundColor:'white',
            padding: 10,
            width: 150,
            borderRadius:10,
            marginLeft:20,
        }}>
            <Text style={{textAlign:'center'}}>
                Visualizar vaga        
            </Text>                         
        </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: 'grey', flexWrap:'wrap', position:'relative'}}>
            {
            vacancieShow  ?  
                    <View style={{flexWrap:'wrap', flexDirection:'row'  ,alignItems:'flex-start', marginBottom:20}} >
                        <View style={{ alignItems:'flex-start', flex:1, marginTop:30, marginLeft:20, borderRadius:10, borderColor:'white'}}>
                            <Text style={{color:"white", width:'80%', height:100, fontSize:14, fontWeight: 'bold', marginTop:30}}>Nome da vaga: {vacancieShow.title}</Text>
                            <Text style={{color:"white", width:'80%', height:100, fontSize:14, fontWeight: 'bold'}}>Setor: {vacancieShow.workNiche}</Text>
                            <Text style={{color:"white", width:'80%', height:100, fontSize:14, fontWeight: 'bold'}}>Cargo: {vacancieShow.occupation}</Text>
                            <Text style={{color:"white", width:'80%', height:100, fontSize:14, fontWeight: 'bold'}}>Requerimentos: {vacancieShow.requirements}</Text>
                            <Text style={{color:"white", width:'80%', height:100, fontSize:14, fontWeight: 'bold'}}>Descrição: {vacancieShow.description}</Text>
                        </View>
                    </View>
            : <Text>Sem dados</Text> }  
            
        </View>
            <Button title="Voltar" onPress={toggleModal} color={'#212923'} style={{position:'absolute', }}/>
      </Modal>
    </View>
  );
}
