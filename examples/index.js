import whatsAppClient from '../src/index.js'
import dotenv from "dotenv";
import express from "express";

// Send Whatsapp message
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const response = await restAPI.message.sendMessage(79999999999, "hello world");
})();

// Send Whatsapp message using callbacks
dotenv.config()
const restAPI = whatsAppClient.restAPI(({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
}))
restAPI.message.sendMessage('17633123456@c.us', "hello world")
.then((data) => {
    console.log(data);
}) ;

// Send Whatsapp file
(async () => {
    dotenv.config()
    const restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))
    const response = await restAPI.file.sendFileByUrl(null, 79999999999, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse');
})();

// Send message and receive webhook
(async () => {
    try {
        dotenv.config()

        await restAPI.settings.setSettings({
            webhookUrl: 'MY_HTTP_SERVER:3000/webhooks'
        });

        const app = express();
        const webHookAPI = whatsAppClient.webhookAPI(app, '/webhooks')

        webHookAPI.createOutgoingMessageStatusHook((data) => {
            console.log(`outgoingMessageStatus data ${data.toString()}`)
        });
        webHookAPI.createStateInstanceChangedHook((data) => {
            console.log(`stateInstanceChanged data ${data.toString()}`)
        });

        app.listen(3000, async () => {
            console.log(`Started. App listening on port 3000!`)

            const restAPI = whatsAppClient.restAPI(({
                idInstance: process.env.ID_INSTANCE,
                apiTokenInstance: process.env.API_TOKEN_INSTANCE
            }));
    
            response = await restAPI.message.sendMessage(null, 79999999999, "hello world");
    
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

