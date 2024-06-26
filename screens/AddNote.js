import { StyleSheet, TextInput, Modal ,Text, TouchableOpacity, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../styles/global";
import { MaterialCommunityIcons, Foundation, Ionicons, AntDesign } from '@expo/vector-icons';

export default function AddNote({navigation, route}) {
    const [title,setTitle]=useState("");
    const [content, setContent]=useState("");
    const {type, editNote} = route.params|| {};
    const [modal, setModal] =useState(false)
    
    useEffect(() => {
        if(type==="edit" && editNote){
            setContent(editNote.content);
            setTitle(editNote.title);
        } else{
            setContent("");
            setTitle("");
        }
    }, []);

    const handleSave = () => {
        if(type==="edit"){
            const updatedNote={
                id: editNote.id,
                title:title || "Untitle",
                content: content || "",
            }
            navigation.navigate("Home", updatedNote);
            console.log(updatedNote);
        }
        else{
            const newNote = {
                id: Date.now(),
                title: title || "Untitled",
                content: content || "",
            };
            navigation.navigate("Home", newNote);
            console.log(newNote)
        }
    };

    return (
        <React.Fragment>
            <View style={globalStyles.top}>
                <TouchableOpacity>
                    <Ionicons name="chevron-back" 
                    size={20} color="black" 
                    style={globalStyles.iconButton} 
                    onPress={()=>setModal(true)} />
                </TouchableOpacity>
                <View style={globalStyles.icons}>
                <TouchableOpacity>
                    <AntDesign 
                        name="eyeo" 
                        style={globalStyles.iconButton} 
                        size={19} color="black" 
                        onPress={()=>navigation.navigate("AddNote")}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons 
                    name="content-save-outline" 
                    style={globalStyles.iconButton} 
                    size={20} 
                    color="black"
                    onPress={handleSave}
                    />
                </TouchableOpacity>
                </View>
            </View >
            <View style={styles.type}>
            <TextInput 
            multiline
            placeholder="Title"
            style={styles.titleInput}
            onChangeText={setTitle}
            value={title}
            />
            <TextInput 
            multiline
            placeholder="Type something..."
            style={styles.text}
            onChangeText={setContent}
            value={content}
            />
            </View>

            <Modal visible={modal} transparent>
            <View style={styles.modalContainer}>
            <Foundation name="info" size={36} color="#D1D0D0" />
                <Text style={[styles.modalText,{ color: 'white', fontSize:20 }]}>Save changes ?</Text>
                <View style={styles.twoBtns}>
                    <Pressable title="Discard"  
                    style={[styles.btn, styles.discardBtn]}
                    onPress={navigation.goBack}>
                        <Text  style={{ color: 'white', fontSize:20 }}>Discard</Text>
                    </Pressable>
                    <Pressable  
                    style={[styles.btn,styles.saveBtn]}
                    onPress={handleSave}>
                        <Text style={{ color: 'white', fontSize:20 }}>Save</Text>
                    </Pressable>
                </View>
            </View>
            </Modal>

            
        </React.Fragment>
    )
};
const styles = StyleSheet.create({ 
type:{
    flex:8,
    paddingHorizontal:30,
    
},
titleInput:{
    fontSize:30,
    paddingBottom:30,
},
text:{
    fontSize:20,
},
modalContainer:{
    width:300,
    height:220,
    justifyContent:"center",
    alignItems:"center", 
    backgroundColor:"#414141",
    alignSelf:"center",
    marginVertical:270,
    borderRadius:10,
    gap:30
},
twoBtns:{
    flexDirection:"row",
    gap:20,
},
btn:{
    // paddingHorizontal:20,
    borderRadius:10,
    height:40,
    justifyContent:"center",
    width:120,
    alignItems:"center",
    
},
discardBtn:{
    backgroundColor:"red",
    
},
saveBtn:{
    backgroundColor:"#469F46"
}

});
