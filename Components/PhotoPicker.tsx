import * as ImagePicker from "expo-image-picker";
import {View,Pressable, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { useState } from "react";
import APPSTYLES from "../Styles";

export default function PhotoPicker()
{
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if(!res.canceled)
        {
            setImage(res.assets[0].uri);
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={pickImage} style={APPSTYLES.button}>
                <Text style={{color:"#000"}}>Pick an image.</Text>
            </TouchableOpacity>
            {image && <Image source={{uri:image}} style={{width:230, height:230, borderRadius:60, margin: 10}}/>}
            {!image && <View style={{width: 230, height: 230, margin: 10, backgroundColor: "#555555", borderRadius:60}}></View>}
        </View>
    );
}