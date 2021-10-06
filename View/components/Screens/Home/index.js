import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { homeStyles } from './styles'

export default class index extends Component {

    constructor(props){
        super(props)

        this.state = {userList:[] , isListRefreshing:false}
        
        pageIndex = 1
    }

    componentDidMount(){
        this.GetUsersList()
    } 

    renderRowItem = (rowItem) =>{
        return(
            <Card style={{margin:'2%'}} onPress={() => this.GoToPerfil(rowItem.item.id)}>
                <View style={{alignItems:'center', margin:'2%'}}>
                    <Avatar.Image size={150} source={{uri:rowItem.item.avatar}}/>
                    <View style={{alignSelf:'center', margin:'5%', alignItems:'center', marginTop:'2%'}}>
                            <Text style={{fontSize:20,}}>{rowItem.item.first_name}</Text>
                            <Text style={{fontSize:15,}}>{rowItem.item.email}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    rowItemSeparator = () => {
        return(
            <View style = {{height:1, backgroundColor:'grey', marginLeft:'5%'}}/>
        )
        
    }

    GetUsersList = () => {
        var usersurl = 'http://reqres.in/api/users?page=' + pageIndex
        fetch(usersurl)
        .then((response)=> response.json())
        .then((responseJson)=> {
            // setTimeout(()=> {
            //      }, 2000);
            this.setState({
                userList: this.state.userList.concat(responseJson.data),
                isListRefreshing: false
            })
        })
    }

    LoadMoreUsers = () =>{
        pageIndex= pageIndex+1
        this.GetUsersList()
    }

    refreshUsersList = () =>{
        pageIndex = 1
        this.setState({
            userList: [],
            isListRefreshing:true
        })
        this.GetUsersList()
    }

    GoToPerfil =( selectedUser ) =>{
        console.log("selected user", selectedUser)
        this.props.navigation.navigate('Perfil', selectedUser)
    }
r
    render(){
    return (
            <SafeAreaView style={homeStyles.parentSafeView}>
                <View style={homeStyles.parentSafeView}>
                    <FlatList 
                        data={this.state.userList} 
                        renderItem ={this.renderRowItem}
                        onEndReached={this.LoadMoreUsers}
                        onEndReachedThreshold={0.1}
                        onRefresh={this.refreshUsersList}
                        refreshing={this.state.isListRefreshing}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

