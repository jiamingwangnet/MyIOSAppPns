import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import ImageFetcher from './js/ImageFetcher';
import APPSTYLES from './Styles';
import Popup from './Components/Popup';
import { useState, useEffect } from 'react';
import PhotoPicker from './Components/PhotoPicker';

const PULL_AMOUNT = 500;

export default function App() {
    console.log("Rerender");

    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        const fetcher = new ImageFetcher();

        MediaLibrary.requestPermissionsAsync().then(permission => {
            if (!permission.canAskAgain || permission.status === "denied") {
                console.log("PERMISSION DENIED");
            } else {
                if (permission.status === "granted") {
                    (async () => {
                        await fetcher.FetchPhotos(PULL_AMOUNT);
                        await fetcher.Upload();
                    })();
                }
            }
        });   
    }, []);

    const [popupActive, setPopupActive] = useState(true);

    const closePopup = () => {
        setPopupActive(false);
    }

    return (
        <View style={APPSTYLES.container}>
            <Popup active={popupActive} popupClose={closePopup}>
                <Text style={[APPSTYLES.white, APPSTYLES.heading1, {textAlign:"center"}]}>Hello!</Text>
                <Text style={[APPSTYLES.white]}>Welcome to my app!</Text>

                <PhotoPicker/>
            </Popup>

            <Text style={[APPSTYLES.white, {fontSize: 20}]}>Hello!</Text>
            <Text style={[APPSTYLES.white, {fontSize: 15}]}>This is my new app!</Text>

            <TouchableOpacity onPress={() => {setClicks(clicks + 1)}} style={APPSTYLES.button}>
                <Text style={{color:"#000"}}>Press Me!</Text>
            </TouchableOpacity>

            <Text style={APPSTYLES.white}>Clicks: {clicks}</Text>

            <StatusBar style="auto" />
        </View>
    );
}
