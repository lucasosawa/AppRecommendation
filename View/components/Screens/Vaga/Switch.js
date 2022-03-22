import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function Switch({
    selectionMode,
    option1,
    option2,
    onSelectSwitch
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const updateSwitchData =(value) =>{
        setSelectionMode(value);
        onSelectSwitch(value);
    }
    return (
        <View style={{height:44, width:'95%', backgroundColor:'grey', borderRadius:10, borderColor: 'white', flexDirection:'row', justifyContent:'center', marginTop: 20, marginLeft:10}}>
            <TouchableOpacity activeOpacity={1} onPress={() => updateSwitchData(1)} style={{ flex:1, backgroundColor: getSelectionMode == 1 ? '#ccc' : 'black', borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color: getSelectionMode == 1 ? 'black' : 'white', fontSize:15}}>
                    {option1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => updateSwitchData(2)} style={{ flex:1, backgroundColor: getSelectionMode == 2 ? '#ccc' : 'black', borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color: getSelectionMode == 2 ? 'black' : 'white', fontSize:15}}>
                    {option2}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
    
