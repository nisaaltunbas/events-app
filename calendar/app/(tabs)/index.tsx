import { StyleSheet, Text, Touchable, TouchableOpacity, View,TextInput,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useFocusEffect,Link,Redirect } from 'expo-router'
import { signInWithEmailAndPassword,signOut } from 'firebase/auth'
import{push,ref,set,onValue} from 'firebase/database'
import Firebase from '../../firebaseConfig'


const index = () => {
  const[sayi,setSayi]=useState(0)
  const[mesaj,setMesaj]=useState("")
  const[user,setUser]=useState("")
  const[data,setData]=useState([]);

  useEffect(()=>{
    const reference = ref(Firebase.database,'etkinlikler');
    onValue(reference,(snapshot)=>{
      const fetchData=[];
      snapshot.forEach((x)=>{
        console.log(x.val().konum);
        fetchData.push({
          key:x.key,
          ...x.val()
        });
      });
      setData(fetchData);
    });

  },[])

  useFocusEffect(()=>{
    const giriskontrol= async ()=>{
      const token= await AsyncStorage.getItem('giris');
      if(!token){
        router.replace('./login')
      }
      console.log(token,"key")

      setUser(token)

      set(ref(Firebase.database,'test'),{
        'mesaj':'bu bir test'
      })
    }
    giriskontrol();
  })


  const cikisyap=async()=>{
    try{
      await signOut(Firebase.auth);
      await AsyncStorage.removeItem('giris');
      setSayi(sayi+1)
    
    }
    catch(error){
      console.log(error)
    }
  }

  const gonder=()=>{
    const referans = push(ref(Firebase.database,'users/'+user+'/veri'))
    set(referans,{
      'zaman':Date.now(),
      'mesaj':mesaj
    }).then(()=>{
      setMesaj('')
    })
  }

  const yonlendir=(idkey,item)=>{
    router.navigate({pathname:'/etkinlik/'+idkey,params:item})

  }

  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <View style={{paddingTop:45,paddingBottom:20,backgroundColor:'white'}}>
        <Text style={{textAlign:'center',fontSize:36,fontWeight:'bold'}}>Etkin<Text style={{fontWeight:900,color:'crimson',fontStyle:'italic'}}>Click</Text></Text>
      </View>
      <FlatList
          data={data}
          renderItem={({item})=>(
           <TouchableOpacity onPress={()=>yonlendir(item.key,item)}>
            <View style={styles.card}>
              <Text style={styles.cardtitle}>{item.etkinlik.toUpperCase().slice(0,25)}</Text>
              <Text>{new Date(item.eklenmetarihi).toLocaleDateString("tr-TR")}</Text>
              <Text>{item.konum}</Text>
              <Link href={{pathname:'/etkinlik/'+item.key,params:item}}>İncele</Link>
              </View>
              </TouchableOpacity>
             
          )}
          keyExtractor={item=>item.key}
      />
      <TouchableOpacity style={styles.cikisbtn} onPress={cikisyap}>
        <Text style={styles.cikistext}>Güvenli Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  cikisbtn:{
    backgroundColor:'crimson',
    padding:8,
  },
  cikistext:{
    color:'white',
    textAlign:'center',
    fontSize:19
  },
  card:{
    margin:20,
    marginBottom:0,
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
    fontSize:21,
    fontWeight:'bold',
    marginBottom:10,
}
})