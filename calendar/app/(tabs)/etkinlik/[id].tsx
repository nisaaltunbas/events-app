import { StyleSheet, Text, TouchableOpacity, View,TextInput} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {useLocalSearchParams,Link, useFocusEffect, useRouter} from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {push,ref,set,onValue} from 'firebase/database';
import Firebase from '../../../firebaseConfig'
import { useReducedMotion } from 'react-native-reanimated';



const id = () => {
  const item=useLocalSearchParams(); 
  const[userid,setUserid]=useState(""); 
  const[etkinlikid,setEtkinlikid]=useState("")
  const[favorivarmi,setFavorivarmi]=useState(false)
  const[isim,setIsim]=useState("")
  const[soyisim,setSoyisim]=useState("")
  const[telefon,setTelefon]=useState("")
  const[sayi,setSayi]=useState(0)

const router=useRouter();
  useLayoutEffect(()=>{
    setEtkinlikid(item.id);
    setUserid(AsyncStorage.getItem('giris'));

  },[router,isim,soyisim,telefon])

  useEffect(()=>{
    
    

    const favoriref=ref(Firebase.database,'favoriler');
    const degerler=onValue(favoriref,(snapshot)=>{
      snapshot.forEach((fav)=>{
        const eid=fav.val().etkinlikid;
        const euid=fav.val().userid;
        if(eid==etkinlikid && euid==userid._j){
          setFavorivarmi(true)
          console.log("favoride var")
        }
        
      })
    })


  },[]);

  const favori =async()=>{
    if(!favorivarmi){
      const referans= await push(ref(Firebase.database,'favoriler/'));
      set(referans,{
        'zaman':Date.now(),
        'userid':userid._j,
        'etkinlikid':etkinlikid
      }).then(
      ()=>{
        console.log("Favorilere Eklendi")
      }
      )

    }
    
  }

  const rezervasyonyap=()=>{
    const rezRef=ref(Firebase.database,`kayitlar/${userid._j}/rezervasyon`);
    set(rezRef,{
      etkinlikid:etkinlikid,
      isim:isim,
      soyisim:soyisim,
      telefon:telefon,
      tarih:Date.now(),
      durum:'Bekliyor'
    }).then(()=>{
      setIsim('');
      setSoyisim('');
      setTelefon('');
    })
    
  }

  


  return (
    <View style={{paddingTop:40}}>
      <View style={{paddingStart:10}}><Link href="/"><Text>Geri</Text></Link></View>

      <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:28,padding:15,fontWeight:800,flex:5}}>
            {item.etkinlik}
          </Text>

          <Text style={{fontSize:28,padding:15,fontWeight:800,marginTop:5,flex:1}}>

            
            <TouchableOpacity onPress={favori}>
              {favorivarmi?<AntDesign name="heart" size={32} color="red" />: 
              <AntDesign name="hearto" size={32} color="red" /> }
              
            </TouchableOpacity>
            
          </Text>

      </View>

      
      <Text style={{padding:15,fontSize:20}}>{item.aciklama}</Text>

      <View>
        <TextInput placeholder='İsim' value={isim} onChangeText={setIsim} style={styles.input} />
        <TextInput placeholder='soyisim' value={soyisim} onChangeText={setSoyisim} style={styles.input} />
        <TextInput placeholder='telefon' value={telefon} onChangeText={setTelefon} style={styles.input} />

        <TouchableOpacity onPress={rezervasyonyap}>
          <Text>Rezervasyon Oluştur</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default id

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderColor:"black",
    fontSize:19,
    padding:5,
    margin:10,
    borderRadius:10
  }
})