import { StyleSheet,FlatList, ImageBackground, Modal ,Text, TouchableOpacity, View, Dimensions, Image } from "react-native";
import React, {useEffect, useState,useRef} from "react";
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import {globalStyles} from '../styles/global'
import { Swipeable, GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backgroundImage = require('../assets/images/Main.png');
const backgroundImage1 = require('../assets/images/Search.png')
export default function Home({navigation, route}) {
const [notes, setNotes]= useState ([]);
const colors=['#E28DC0','#A78DE2','#8DD7E2','#D18D8D','#8DC1D1','#8DE2AC','#DFE28D','#E2B58D'];
const note = route.params;
const [modalOpen, setModalOpen]=useState(false);
const [searchText, setSearchText]=useState("");
const [filteredNotes, setFilteredNotes]= useState([]);
const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

//get notes/data
useEffect(()=>{
  const loadNotes= async()=>{
    try {
      const storedNotes= await AsyncStorage.getItem("notes");
      if (storedNotes) setNotes(JSON.parse(storedNotes))
    } catch (error) {
      console.log(error)
    }
  }
  loadNotes();
},[])

//save notes/data
useEffect(()=>{
  const saveData= async()=>{
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notes))
    } catch (error) {
      console.log(error)
    }
  }
  if (notes.length>0) saveData();
},[notes])

//add notes
useEffect(()=>{
  if(note){
    setNotes(pre =>{
      const existingIndex= pre.findIndex(n => n.id ===note.id);
      if(existingIndex>=0){
        const newNotes=[...pre];
        newNotes[existingIndex]={...newNotes[existingIndex], ...note};;
        return newNotes;
      } else {
        return [...pre, {...note, color:getRandomColor()}]
      }
    });
  }
},[note]);


//search function
useEffect(() => {
  const newFilteredNotes = notes.filter(note =>
      note.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchText.toLowerCase())
  );
  setFilteredNotes(newFilteredNotes);
}, [searchText, notes]);

const handleDelete =(index)=>{
  setNotes(pre => pre.filter((_, i)=> i!==index))
}
const RightAction= (index) =>(
  <TouchableOpacity onPress={()=>handleDelete(index)}>
    <View style={styles.delete}>
    <MaterialIcons name="delete" size={39} color="white" />
    </View>
  </TouchableOpacity>
);
const handleEdit=(editNote)=>{
navigation.navigate("AddNote",{type:"edit", editNote})
}
const handleClose= ()=>{
  setModalOpen(false);
  setSearchText("");
}

    return (
      <React.Fragment>
      <GestureHandlerRootView style={{flex:1}}>

        <View style={globalStyles.top}>
             <Text style={styles.notes}>Notes</Text>
             <View style={globalStyles.icons}>
             <TouchableOpacity>
                <AntDesign 
                name="search1" 
                style={globalStyles.iconButton} 
                size={20} 
                color="black" 
                onPress={()=>setModalOpen(true)}
                />
             </TouchableOpacity>
             <TouchableOpacity>
                <AntDesign 
                name="infocirlceo" 
                style={globalStyles.iconButton} 
                size={20} 
                color="black" 
                />
             </TouchableOpacity>
             </View>
        </View>
        
        {/*----- This  is the background image ------*/}
        <View  style={styles.middle}>
        {notes.length===0 && <ImageBackground  source={backgroundImage}  style={styles.backgroundImage}>
                {/* This is the text */}
               <Text style={styles.title}>Create your first note !</Text>
        </ImageBackground>}

         {/* -------modal for search bar------------ */}
        <Modal visible={modalOpen}>
          
          <View style={styles.modalContainer}>
            <TextInput
            placeholder="Search by the keyword..."
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            style={styles.search}
            onChangeText={setSearchText}
            value={searchText}
            />
            <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={24} color="black"/>
            </TouchableOpacity>
          </View>
          <View style={styles.middle}>
                    {filteredNotes.length === 0 && (
                      <View style={styles.image}>
                        <Image source={backgroundImage1} style={{width: 340, height: 300}}/>
                      </View>
                        
                    )}
                    {searchText.length !== 0 &&(
                      <FlatList
                        data={filteredNotes}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Swipeable renderRightActions={() => RightAction(index)}>
                                    <View style={[styles.noteContainer, { backgroundColor: item.color }]}>
                                        <Text style={styles.noteTitle}>{item.title}</Text>
                                    </View>
                                </Swipeable>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.noteList}
                    />)}
                </View>
        </Modal>
        
         {/*---------Displaying the note list ---------*/}
        <FlatList
        data={notes}
        renderItem={({item,index}) => (
          <TouchableOpacity onPress={()=>handleEdit(item)}>
          <Swipeable 
          renderRightActions={()=>RightAction(index)}>
          <View style={[styles.noteContainer, { backgroundColor: item.color }]} >
          <Text 
          style={styles.noteTitle}>{item.title}</Text>
          </View>
          </Swipeable>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.noteList]}
        />
        </View>
        {/* ---------- closing the middle part-------- */}

        {/*---------- This is the plus button------ */}
        <View style={styles.bottom}>
        <TouchableOpacity style={styles.plusbutton} onPress={()=> navigation.navigate("AddNote")}>
        <Feather name="plus" size={28} color="black" />
        </TouchableOpacity>
        </View>    


      </GestureHandlerRootView>  
      </React.Fragment>
    );
  }


//-------------------------------styling---------------------
  const { width, height } = Dimensions.get('window');
  const styles = StyleSheet.create({
    middle:{
        flex:7,
    },
    notes:{
        fontSize:35,
        padding:20,
        fontWeight:"bold"
    },
    backgroundImage: {
        width:width,
        height:height*0.6,
        flex:1,
        resizeMode: 'contain', // This makes sure the image covers the entire background
        alignItems: 'center', // Center the content horizontally
    },
    title: {
        fontSize: 20,
        color: 'black',
        top:height*0.53
      
      },
    bottom:{
        flex:1,
        alignItems:"flex-end",
        paddingHorizontal:20,
        marginBottom:20
      },
    plusbutton:{
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
        height:60,
        width:60,
        shadowColor: "#000",
        shadowOffset: {
          width:-4,
          height: 3,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 0.5,
      },
      noteList:{
        paddingHorizontal:20,
        
      },
      noteTitle:{
        fontSize:20,
      },
      noteContainer:{
        paddingHorizontal: 40,
        borderRadius: 10,
        padding:30,
        marginBottom:10
      },
      modalContainer:{
        width:width*0.9,
        backgroundColor:"#E8E7E7",
        marginHorizontal:20,
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:30,
        borderRadius:30,
        height:50,
        alignItems:"center",
        paddingHorizontal:20
      },
      search:{
        fontSize:18
      },
      image:{
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
      },
      delete:{
        backgroundColor:"#FE3232",
        marginBottom:10,
        flex:1,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        width:width*0.89,
        paddingHorizontal:40,
      }
 });
  