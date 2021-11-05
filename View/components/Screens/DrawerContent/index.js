import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../../../helpers/authentication/AuthContext'
import { DrawerContentScrollView, DrawerItem, DrawerItemList,} from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

export function CustomDrawerContent(props) {
    
    const { signOut } = React.useContext(AuthContext);
    return (
        <View style={{flex: 1}}>
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
                                <Caption style={styles.caption}>@LucasBottine</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style ={styles.drawerSection}>
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <Ionicons 
                            name="home" 
                            color={color} 
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('BottomStackHome')}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <FontAwesome 
                            name="user" 
                            color={color} 
                            size={size}
                            />
                        )}
                        label=" Profile"
                        style={{marginLeft:13}}
                        onPress={() => {props.navigation.navigate('')}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <FontAwesome 
                            name="bell" 
                            color={color} 
                            size={size}
                            />
                        )}
                        label="Notification"
                        onPress={() => /*signOut*/{}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <FontAwesome 
                            name="list-alt" 
                            color={color} 
                            size={size}
                            />
                        )}
                        label="Vagas"
                        onPress={() => /*signOut*/{}}
                    />
                    <DrawerItem 
                        icon={({ color, size }) => (
                            <Ionicons 
                            name="settings" 
                            color={color} 
                            size={size}
                            />
                        )}
                        label="Settings"
                        onPress={() => /*signOut*/{}}
                    />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section styles={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({ color, size }) => (
                        <Ionicons 
                        name="exit-outline" 
                        color={color} 
                        size={size}
                        />
                    )}
                    label="Sign out"
                    onPress={() => signOut()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex:1,
        flexDirection: 'column'
    },
    userInfoSection:{
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection:'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop:25,
    },
    bottomDrawerSection:{
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})