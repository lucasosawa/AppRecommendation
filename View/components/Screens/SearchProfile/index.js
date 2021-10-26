import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class index extends Component {

    constructor(props){
        super(props)

        console.log("verifying prop values", this.props.route.params)
    }

    render(){
        return (
            <View>
                <Text>This is person detail screen</Text>
            </View>
        )
    }
}

