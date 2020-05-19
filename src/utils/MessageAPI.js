'use strict'
import axios from 'axios';
import CommonUtils from './CommonUtils.js'

class MessageAPI {

    constructor(greenAPI) {
        this._greenAPI = greenAPI;
    }
    /** Send text message to chat or phone. Method call adds message to sending queue
     * 
     * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages). 
     *  Mandatory if phoneNumber is empty
     * @param {Number} phoneNumber - receiver phone number using international format whithout + sign.
     * Mandatory if chatId is empty
     * @param {String} message - text message
     */
    async sendMessage (chatId, phoneNumber, message) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('message', message);

        const method = 'sendMessage';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'message': message,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {Number} phoneNumber 
     * @param {String} nameLocation 
     * @param {String} address 
     * @param {Number} latitude 
     * @param {Number} longitude 
     */
    async sendLocation (chatId, phoneNumber, nameLocation, address, latitude, longitude) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('nameLocation', nameLocation);
        CommonUtils.validateString('address', address);
        CommonUtils.validateNumber('latitude', latitude);
        CommonUtils.validateNumber('longitude', longitude);

        const method = 'sendLocation';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'nameLocation': nameLocation,
            'address': address,
            'latitude': latitude,
            'longitude': longitude,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {Number} phoneNumber 
     * @param {Object} contact - object with one or more fields
     */
    async sendContact (chatId, phoneNumber, contact) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateObject('contact', contact);

        const method = 'sendContact';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'contact': contact,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {Number} phoneNumber 
     * @param {String} urlLink
     */
    async sendLink (chatId, phoneNumber, urlLink) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);
        CommonUtils.validateString('urlLink', urlLink);

        const method = 'sendLink';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'urlLink': urlLink,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

    /**
     * 
     * @param {String} chatId 
     * @param {Number} phoneNumber 
     * @param {String} idMessage 
     */
    async readChat (chatId, phoneNumber, idMessage = null) {
        CommonUtils.validateChatIdPhoneNumber(chatId, phoneNumber);

        const method = 'readChat';
        const postData = {
            'chatId': chatId,
            'phoneNumber': phoneNumber,
            'idMessage': idMessage ,
        }
        const response = await axios.post(CommonUtils.generateMethodURL(this._greenAPI.params, method), postData);
        return response.data
    }

      /**
     * Returns array of QueueMessage objects
     */
    async showMessagesQueue() {
        const method = 'showMessagesQueue';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data.map((msg) => new QueueMessage(msg))
    }

    async clearMessagesQueue() {
        const method = 'clearMessagesQueue';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data
    }

    /**
     * Returns array of Message objects
     */
    async lastIncomingMessages() {
        const method = 'lastIncomingMessages';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data.map((msg) => new Message(msg))
    }

    /**
     * Returns array of Message objects
     */
    async lastOutgoingMessages() {
        const method = 'lastOutgoingMessages';
        const response = await axios.get(CommonUtils.generateMethodURL(this._greenAPI.params, method));
        return response.data.map((msg) => new Message(msg))
    }
}

class Message {
    constructor(data) {
        this.chatId = data.chatId;
        this.idMessage = data.idMessage;
        this.statusMessage = data.statusMessage;
        this.textMessage = data.textMessage;
        this.timestamp = data.timestamp;
        this.typeMessage = data.typeMessage;
    }
}

class QueueMessage {
    constructor(data) {
        this.chatId = data.chatId;
        this.fileName = data.fileName;
        this.typeMessage = data.typeMessage;
    }
}

export default MessageAPI;