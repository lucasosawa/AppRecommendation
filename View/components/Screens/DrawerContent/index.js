import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../../../helpers/authentication/AuthContext'
import { DrawerContentScrollView, DrawerItem, DrawerItemList,} from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import {styles} from './styles'

export function CustomDrawerContent(props) {
    
    const { signOut } = React.useContext(AuthContext);
    return (
        <View style={{flex: 1, backgroundColor: '#24231f'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={ { flexDirection:'row', marginTop: 15 } }>
                            <Avatar.Image
                                source={{
                                    uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                                }}
                                size={60}
                            />
                            <View style={{flexDirection: 'column', marginLeft: 15}}>
                                <Title style={styles.title}>Lucas Bottine</Title>
                                
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style ={styles.drawerSection}>
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <Ionicons 
                            name="home" 
                            color={'white'} 
                            size={size}
                            />
                        )}
                        label="Home"
                        labelStyle={{color:'white'}}
                        onPress={() => {props.navigation.navigate('BottomStackHome')}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <FontAwesome 
                            name="user" 
                            color={'white'} 
                            size={size}
                            />
                        )}
                        label=" Profile"
                        labelStyle={{color:'white'}}
                        style={{marginLeft:13}}
                        onPress={() => {props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <FontAwesome 
                            name="bell" 
                            color={'white'} 
                            size={size}
                            />
                        )}
                        label="Notification"
                        labelStyle={{color:'white'}}
                        onPress={() => {props.navigation.navigate('Notification')}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <FontAwesome 
                            name="list-alt" 
                            color={'white'} 
                            size={size}
                            />
                        )}
                        label="Vagas"
                        labelStyle={{color:'white'}}
                        onPress={() => {props.navigation.navigate('Vaga')}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <Ionicons 
                            name="settings" 
                            color={'white'} 
                            size={size}
                            />
                        )}
                        label="Settings"
                        labelStyle={{color:'white'}}
                        onPress={() => {props.navigation.navigate('Settings')}}
                    />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section styles={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({ color, size }) => (
                        <Ionicons 
                        name="exit-outline" 
                        color={'white'} 
                        size={size}
                        />
                    )}
                    label="Sign out"
                    labelStyle={{color:'white'}}
                    onPress={() => signOut()}
                />
            </Drawer.Section>
        </View>

    );
}

