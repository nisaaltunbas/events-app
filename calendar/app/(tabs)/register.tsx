import { StyleSheet, Text, View,TextInput ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Firebase from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'


const register = () => {

const[email,setEmail]=useState("")
const[password,setPassword]=useState("")

const kayitol=async()=>{
    await createUserWithEmailAndPassword(Firebase.auth,email,password)
    await setEmail("");
    await setPassword("");
    router.push('./login')
}
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <View style={styles.card}>
        <Text style={styles.cardtitle}>Kayıt Ol</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Email Adresiniz' placeholderTextColor='gray'></TextInput>
        <TextInput  style={styles.input} value={password} onChangeText={setPassword} placeholder='Şifreniz'placeholderTextColor='gray' secureTextEntry></TextInput>
        <TouchableOpacity style={styles.buton} onPress={kayitol}>
            <Text style={styles.butontext}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default register

const styles = StyleSheet.create({
    card:{
        margin:20,
        padding:30,
        borderColor:"#cccccc",
        borderWidth:1,
        borderRadius:30,
        backgroundColor:'floralwhite'
    },
    input:{
        borderBottomWidth:2,
        borderBottomColor:'#cccccc',
        padding:5,
        fontSize:18,
        marginBottom:20,
    },
    buton:{
        alignItems:'center',
        backgroundColor:'crimson',
        padding:8,
        marginTop:50,
        borderRadius:6,
    },
    butontext:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
    },
    cardtitle:{
        fontSize:36,
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
        marginBottom:50,
    }
})