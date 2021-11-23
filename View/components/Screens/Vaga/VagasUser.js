
// import React, {useState, useContext, useEffect} from "react";
// import { View, Text } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import fetchDataLaravel from "../../../../helpers/API/fetchLAravel";
// import axios from "axios";
// import VagaContext from '../../../../context/VagasContext'

// export const mapVagas = (props) => {

//     const [getVagas, setVagas] = vagas
//     const { vagas } = useContext(VagaContext)

//     const getData = async () => {
//         try {
//         const vagasRequests = await axios.all([
//             fetchDataLaravel('user/pivotvacancie'),
//         ])
//             setVagas(vagasRequests[0]);
//             console.log(vagasRequests[0]);
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     useEffect(() => {
//         getData()

//         return () => {
//         setVagas(null)
//         }
//     }, [])

//     getVagas.map((index, i) => {
//         return(
//             <View key={i.toString()} style={{ flexDirection: 'row',justifyContent:'space-between', alignItems:'center', marginBottom:20}} >
//                 <View style={{flexDirection: 'row' ,alignItems:'center', flex:1, marginTop:30, marginLeft:20, borderRadius:10, borderColor:'white'}}>
//                     <Text style={{color:"grey", width:'80%', height:40, fontSize:15, fontWeight: 'bold'}}>Nome da vaga: {index.vacancie.title}</Text>
//                 </View>  
//             </View>
//         );
//     })
//     return(
//         <this.mapVagas
//     );
// }