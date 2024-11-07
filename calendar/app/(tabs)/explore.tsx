import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform,Text,TouchableOpacity,TextInput, Alert } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword,signOut } from 'firebase/auth'
import{push,ref,set} from 'firebase/database'
import Firebase from '../../firebaseConfig'



export default function TabTwoScreen() {
  const[date,setDate]=useState(new Date())
  const[show,setShow]=useState(false);

  const[time,setTime]=useState(new Date())
  const[showtime,setShowTime]=useState(false)

  const[tarihtext,setTarihText]=useState('Tarih')
  const[saattext,setSaatText]=useState('Saat')

  const[etkinlik,setEtkinlik]=useState("")
  const[konum,setKonum]=useState("")
  const[aciklama,setAciklama]=useState("")

  const tarihata=(event,secilitarih)=>{
    const tarih = secilitarih;
    setShow(false)
    setDate(tarih)
  }

  useEffect(()=>{
    setTarihText(date.toLocaleDateString())
    setSaatText(time.toLocaleTimeString())
  },[date,time])

  const saatata=(event,secilisaat)=>{
    const saat = secilisaat;
    setShowTime(false)
    setTime(saat)
  }

  const takvimgoster=()=>{
    if(show==false){
      setShow(true)
    }
  }
  const saatgoster=()=>{
    if(showtime==false){
      setShowTime(true)
    }
  }
  
  const kaydet=()=>{
    const referans = push(ref(Firebase.database,'etkinlikler'))
    set(referans,{
      'etkinlik':etkinlik,
      'tarih':tarihtext,
      'saat':saattext,
      'konum':konum,
      'aciklama':aciklama,
      'eklenmetarihi':Date.now(),
      'durum':false,
    }).then(()=>{
      Alert.alert("Eklendi")
    })
  }
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      
      <ThemedView style={styles.titleContainer}>
      <ThemedView>
       <TextInput value={etkinlik} onChangeText={setEtkinlik} placeholder='Etkinlik İsmi' style={styles.tarihinput} />
       </ThemedView>

        <ThemedView>
        <TouchableOpacity style={styles.tarihinput} onPress={takvimgoster}>
          <Text style={{fontSize:19,color:'gray'}}>{tarihtext}</Text>
        </TouchableOpacity>
        </ThemedView>

        <ThemedView>
        <TouchableOpacity style={styles.tarihinput} onPress={saatgoster}>
          <Text style={{fontSize:19,color:'gray'}}>{saattext}</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView>
       <TextInput value={konum} onChangeText={setKonum} placeholder='Konum' style={styles.tarihinput} />
       </ThemedView>

       <ThemedView>
       <TextInput value={aciklama} onChangeText={setAciklama} multiline={true} numberOfLines={4} placeholder='Açıklama' style={styles.tarihinput}/>
       </ThemedView>

       <ThemedView>
        <TouchableOpacity style={{backgroundColor:'crimson',padding:15}} onPress={kaydet}>
            <Text style={{textAlign:'center', color:'white', fontSize:20}}>Kaydet</Text>
        </TouchableOpacity>
       </ThemedView>
     
      {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode='date'
        display='default'
        onChange={tarihata}
     />
      )}
    
     {showtime && (
        <DateTimePicker
        testID='dateTimePicker'
        value={time}
        mode='time'
        display='default'
        onChange={saatata}
     />
      )}
     </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  tarihinput:{
    width:350,
    borderWidth:1,
    borderColor:'#cccccc',
    padding:10,
    fontSize:19,
    marginBottom:20,


  },
  saatinput:{
    width:350,
    borderWidth:1,
    borderColor:'#cccccc',
    padding:10,
    fontSize:19,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
});
