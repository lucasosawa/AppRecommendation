
import React,{useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import api from "../services/api";
import {
  View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated, 
  Keyboard} from 'react-native';
 


export default function Login({ navigation }){

  
  //=============script animação============
  const [offset]= useState(new Animated.ValueXY({x: 0, y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 130,y: 155}));
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function saveUser(user) {
    await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(user));

  }

  async function post(){
    if (email.length === 0) return

    setLoading(true)

    try {
      const credentials = {
        email: email,
        password: password
      }

      const response = api.post('/auth/login', credentials)
          .then(function (response) {
            // return response.data;
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      const user = response.data;
      await saveUser(user);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'App' })],
      })

      setLoading(false)

      props.navigation.dispatch(resetAction)
    }catch (e) {
      console.log(e);
      setLoading(false)

      Alert('Usuário não existe');
    }

  }

  useEffect(()=>{
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20
    }),
    Animated.timing(opacity,{
      toValue:1,
      duration: 200,
    })
  ]).start();

  }, []);



  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:55,
        duration: 100,
      }),
    Animated.timing(logo.y,{
      toValue:65,
      duration: 100,
    })
  ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:130,
        duration: 100,
      }),
    Animated.timing(logo.y,{
      toValue:155,
      duration: 100,
    })
  ]).start();
  }
  //===============retorno vaiaveis============== 
  return(
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
        style={{
          width: logo.x,
          height: logo.y,
        }}
        source={require('../src/assets/logo.png')}
        />
      </View>

      <Animated.View 
      style={[styles.container,
      {
        opacity: opacity,
       transform:[
         {translateY: offset.y }
       ]
      }
    ]}
      >
        <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        value={email}
        onChangeText={(value)=>setEmail(value)}
        />

         <TextInput
        style={styles.input} 
        placeholder="Senha"
        autoCorrect={false}
        value={password}
        onChangeText={(value)=>setPassword(value)}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={post}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar</Text>
        </TouchableOpacity>
        
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

//===========styles===========
const styles = StyleSheet.create({

  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'

  },
  containerLogo:{
    marginTop: 100,
    justifyContent: 'center',
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 160
  },
  input:{
    backgroundColor:'#FFF',
    width:'90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    },
    
    btnSubmit:{
      backgroundColor:'#35AAFF',
      width:'90%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7
    },
    submitText:{
      color:'#FFF',
      fontSize: 18
    },
    btnRegister:{
      marginTop: 10
    },
    registerText:{
      color:'#FFF',
      
    }

});