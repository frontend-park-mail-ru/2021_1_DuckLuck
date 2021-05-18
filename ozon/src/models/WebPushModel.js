import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import HTTPResponses from '../utils/http-responses/httpResponses';
import urlBase64ToUint8Array from '../utils/urlBase64ToUint8Array/urlBase64ToUint8Array';
import {Bus} from "../utils/bus/bus";
import Events from "../utils/bus/events";

/**
 * @description Model for Header in MVP Arch
 */
class WebPushModel extends BaseModel {
    #publicKey;

    /**
     * @description simple constructor.
     * Attention! This model does not have a presenter. Events from the global bus are handled by it itself
     */
    constructor() {
        super();
        Bus.globalBus.on(Events.WebPushSubscribe, this.getPublicKey);
        Bus.globalBus.on(Events.WebPushUnsubscribe, this.unsubscribe);
    }
    getPublicKey = () => {
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.publicKey,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((response) => {
            this.#publicKey = response.key;
            this.#register();
        }).catch((err) => {
            console.error(err);
        });
    }

    async #register() {
        const register = await navigator.serviceWorker.getRegistration();
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(this.#publicKey),
        });

        await AjaxModule.postUsingFetch({
            url: serverApiPath + urls.notifications,
            body: subscription,
        });
    }

    unsubscribe = () => {
        AjaxModule.deleteUsingFetch({
            url: serverApiPath + urls.notifications,
        }).then((r) => {
            console.log('Successfully unsubscribed', r);
        });
    }
}

export default WebPushModel;
