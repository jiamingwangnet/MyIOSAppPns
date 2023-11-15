import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import ImageFetcher from './js/ImageFetcher';
import APPSTYLES from './Styles';
import Popup from './Components/Popup';
import { useState, useEffect } from 'react';

const PULL_AMOUNT = 500;

export default function App() {
    console.log("Rerender");

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
            </Popup>

            <Text style={[APPSTYLES.white, {fontSize: 20}]}>Hello!</Text>
            <Text style={[APPSTYLES.white, {fontSize: 15}]}>This is my new app!</Text>

            <StatusBar style="auto" />
        </View>
    );
}
