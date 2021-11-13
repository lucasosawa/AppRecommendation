import * as React from 'react';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationModule, DrawerMenu, LoginModule, SignUpModule } from '../../Routing';
import {logout} from '../../View/components/Screens/Auth'

export default function Authentication({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          logout()
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {

      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // console.log("Test data", data)
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: data });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
        {state.userToken == null ? (
          <AuthenticationModule/>
        ) : (
          <DrawerMenu/>
        )}
    </AuthContext.Provider>
  );
}