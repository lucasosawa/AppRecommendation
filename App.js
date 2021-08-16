import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './View/Login';

import Onboarding
    from './View/components/Onboarding';

import { AuthContext } from "./View/Context";
import {getToken, isAuthenticated, logout} from "./View/components/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";



const OnboardingStack = createStackNavigator();
const OnboardingScreen = () => (
    <OnboardingStack.Navigator initialRouteName="Onboarding">
        <OnboardingStack.Screen name="Onboarding" component={Onboarding} />
    </OnboardingStack.Navigator>
);

const createLogin = createStackNavigator();
const loginStackScreen = () => (
    <createLogin.Navigator  headerMode="none">
        <createLogin.Screen name="LoginScreen" component={Login} />
    </createLogin.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
    <RootStack.Navigator headerShown="none">
        {userToken ? (
            <RootStack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{
                    animationEnabled: false
                }}
            />
        ) : (
            <RootStack.Screen
                name="Login"
                component={loginStackScreen}
                options={{
                    animationEnabled: false
                }}
            />
        )}
    </RootStack.Navigator>
);

export default () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {
            signIn: () => {
                setIsLoading(false);
                AsyncStorage.getItem('token_user').then(response => {
                    setUserToken(response);
                });
            },
            signUp: () => {
                setIsLoading(false);
                // setUserToken("asdf");
            },
            signOut: () => {
                setIsLoading(false);
                logout();
            }
        };
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <RootStackScreen userToken={userToken} />
            </NavigationContainer>
        </AuthContext.Provider>
    );
};