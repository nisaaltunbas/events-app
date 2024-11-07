import { StyleSheet, Text, View,TextInput ,TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Firebase from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { router, useFocusEffect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'


const login = () => {

const[email,setEmail]=useState("")
const[password,setPassword]=useState("")


useEffect(()=>{
    const tokenKontrol= async()=>{
        const token=AsyncStorage.getItem('giris')
        if(token){
            router.replace('./')
        }

        tokenKontrol()
    }
},[])


const girisyap=async()=>{
    try{
        const userkey = await signInWithEmailAndPassword(Firebase.auth,email,password)
        await AsyncStorage.setItem("giris",userkey.user.uid)
        console.log(userkey.user.uid)
        
        router.replace('./')
        
    }catch{
        Alert.alert("Girdiğiniz kullanıcı veya şifre yanlış")
        setEmail("")
        setPassword("")
    }   
}
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <View style={styles.card}>
        <Text style={styles.cardtitle}>Giriş Yap</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Email Adresiniz' placeholderTextColor='gray'></TextInput>
        <TextInput  style={styles.input} value={password} onChangeText={setPassword} placeholder='Şifreniz' placeholderTextColor='gray' secureTextEntry></TextInput>
        <TouchableOpacity style={styles.buton} onPress={girisyap}>
            <Text style={styles.butontext}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default login

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