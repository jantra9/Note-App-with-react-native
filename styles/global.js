import { StyleSheet } from "react-native";
export const globalStyles = StyleSheet.create({
    iconButton:{
        borderRadius:10,
        backgroundColor:"#ECEBEB",
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    icons:{
        flexDirection:"row",
        gap:15,
        marginRight:10
    },
    top:{
        flex:2,
        flexDirection:"row",
        paddingHorizontal:10,
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:20
    },
})