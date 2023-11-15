import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import APPSTYLES from '../Styles';
import { Pressable, GestureResponderEvent } from 'react-native'

interface PopupProps
{
    active: boolean;
    popupClose: (event: GestureResponderEvent) => void;
    children: React.ReactNode[] | React.ReactNode;
    index?: number;
}

const styles = StyleSheet.create({
    popup: {
        width: "80%",
        height: "70%",

        backgroundColor: "#181818",
        padding: 10,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,

        position: "absolute",
    }
});

export default function Popup(props: PopupProps) {
    return (
        <View style={[styles.popup, {display: props.active ? "flex" : "none", zIndex: props.index === undefined ? 1 : props.index}]}>
            <Pressable style={{alignSelf: "flex-end"}} onPress={props.popupClose}>
                <Text style={APPSTYLES.white}>&#10005;</Text>
            </Pressable>
            {props.children}
        </View>
    )
}