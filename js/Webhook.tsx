import axios from 'axios';
import { AxiosError } from 'axios';

export interface EmbedURL
{
    url: string;
}

export interface EmbedFooter
{
    text: string;
    icon_url: string;
}

export interface EmbedAuthor
{
    name: string;
    url: string;
    icon_url: string;
}

export interface EmbedFields
{
    name: string;
    value: string;
    inline?: boolean;
}

export interface Embed
{
    author?: EmbedAuthor;
    title: string;
    url?: string;
    description?: string;
    color: number;
    fields?: EmbedFields[];
    thumbnail?: EmbedURL;
    image?: EmbedURL;
    footer?: EmbedFooter;
}

export interface Attachment
{
    id: number;
    description: string;
    filename: string;
}

export interface Webhook 
{
    username: string;
    avatar_url: string;
    content?: string;
    embeds?: Embed[];
    attachments?: Attachment[];
}

export async function SendWebhook(url:string, webhook:Webhook)
{
    console.log("Sending request...");

    axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(webhook)
    }).then(res => {
        console.log("SUCCESS");
    }).catch( (res:AxiosError) => {
        console.log("ERROR: ");
        console.log(res.code);
        console.log(res.cause);
        console.log(res.message);
    })
}