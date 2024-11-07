import { StyleSheet, Text, TouchableOpacity, View,TextInput, Button} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {useLocalSearchParams,Link, useFocusEffect, useRouter} from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {push,ref,set,onValue} from 'firebase/database';
import Firebase from '../../firebaseConfig'


const rezerve = () => {
    const[data,setData]=useState([])
    const router=useRouter()
    const[loading,setLoading]=useState(true)
    const[sayi,setSayi]=useState(0)
    

    useLayoutEffect(()=>{
    
        const userid=AsyncStorage.getItem('giris')
        console.log(userid)
        const reference = ref(Firebase.database,`kayitlar/`);
        onValue(reference,(snapshot)=>{
          const fetchData=[];
          snapshot.forEach((x)=>{
            console.log(x.val());
            fetchData.push({
              key:x.key,
              ...x.val()
            });
          });
          setLoading(false)
          setData(fetchData);
        });
    },[router,sayi])

    if(loading){
        return(
            <View style={{paddingTop:200}}>
                <Text>Yükleniyor</Text>
            </View>
        )
    }
    const getir=async()=>{
        await 
        setSayi(sayi+1)
    }


  return (
    <View>
      <Text>rezerve</Text>
      <TouchableOpacity onPress={getir} style={{paddingTop:200}}>
        <Text>Getir</Text>
      </TouchableOpacity>
    </View>
  )
}

export default rezerve

const styles = StyleSheet.create({})