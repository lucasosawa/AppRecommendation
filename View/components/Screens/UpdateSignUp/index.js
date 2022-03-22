import React, {useState, useEffect} from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const DropDown = (props) => {
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(()=>{
    if(props.onChange){
      props.onChange(selectedValue)
    }
    console.log(selectedValue);
  }, [selectedValue])

  return (
    <View style={{ borderStyle:'solid', borderWidth: 1, borderColor: 'gray', borderRadius: 4,marginBottom:15 }}>
      <Picker
        selectedValue={selectedValue}
        style={{ width: "100%", height: 55, color:'gray'}}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item key={0} label="Select the type of the account" value="" />
        <Picker.Item label="User" value="2" />
        <Picker.Item label="Contractor" value="3"/>
        <Picker.Item label="Company" value="4"/>
      </Picker>
    </View>
  );
}