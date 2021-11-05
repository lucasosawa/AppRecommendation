import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, Alert } from 'react-native'
import { ActivityIndicator, Avatar, Card } from 'react-native-paper'
import { loginStyles } from './styles'
import axios from 'axios'

export default function index() {
    
    const [error, setError] = useState('');
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [viewable, setViewable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    renderRowItem = (item) =>{
        return(
            <Card style={{margin:'2%'}} onPress={() => this.GoToPerfil(item.id)}>
                <View style={{alignItems:'center', margin:'2%'}}>
                    <Avatar.Image size={150} source={{uri:item.avatar}}/>
                    <View style={{alignSelf:'center', margin:'5%', alignItems:'center', marginTop:'2%'}}>
                            <Text style={{fontSize:20,}}>{item.first_name}</Text>
                            <Text style={{fontSize:15,}}>{item.email}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    // GetUsersList = async () => {
    //     var usersurl = 'http://gdevskills.test/api/users/1/admin'

    //     await axios.get(usersurl)
    //     .then((response) => {
    //     console.log(response)
    //     //     this.setState({
    //     //         userList:[...this.state.userList, {...response.data}],
    //     //     })
    //     //     console.log(this.state.userList);
    //     }).catch((error)=>{console.log(error)})
    // }

    async function loadPage(pageNumber = page, shouldRefresh = false) {
        if (pageNumber === total) return;
        if (loading) return;
        
        setLoading(true);
        axios
        .get(`https://5fa103ace21bab0016dfd97e.mockapi.io/api/v1/feed?page=1&limit=4`)
        .then(response => {
            const totalItems = response.headers["x-total-count"]
            const data = response.data
            console.log(data)
            setLoading(false)
            setTotal(Math.floor(totalItems / 4));
            setPage(pageNumber + 1);
            setFeed(shouldRefresh ? data : [...feed, ...data]);
        })
        .catch(err => {
            setError(err.message);
            setLoading(true)
        })
    }

    async function refreshList() {
        setRefreshing(true);
        
        await loadPage(1, true);

        setRefreshing(false);
    }
    
    useEffect(() => {
        loadPage()
    }, []);

    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(viewable.map(({ item }) => item.id));
    }, []);

    return (
            <SafeAreaView style={loginStyles.container}>
                <View style={loginStyles.container}>
                    <FlatList
                        key="list"
                        data={feed} 
                        renderItem ={renderRowItem}
                        ListFooterComponent={loading && <ActivityIndicator style={{size: "small", marginTop: 20}}/>}
                        onViewableItemsChanged={handleViewableChanged}
                        viewabilityConfig={{
                            viewAreaCoveragePercentThreshold: 10,
                        }}
                        showsVerticalScrollIndicator={false}
                        onRefresh={refreshList}
                        refreshing={refreshing}
                        onEndReached={() => loadPage()}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </SafeAreaView>
        )
    }


