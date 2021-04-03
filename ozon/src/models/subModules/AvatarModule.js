import {AjaxModule} from '../../modules/Ajax/Ajax.js';
import {fileServerHost, serverApiPath, urls} from '../../utils/urls/urls';
import BaseModel from '../BaseModel';
import Events from '../../utils/bus/events';
import Responses from '../../utils/bus/responses';

/**
 * @description Model for Avatar Loading/Uploading in MVP Arch
 */
class AvatarModule extends BaseModel {
    /**
     * @param {Object} bus bus of this mvp part
     */
    constructor(bus) {
        super(bus);
    }

    /**
     *
     * @param {string} URL New URL for avatar
     */
    set avatarURL(URL) {
        this._avatarURL= URL;
    }

    /**
     *
     * @return {string} Avatar`s URL
     */
    get avatarURL() {
        if (this._avatarURL === undefined) {
            AjaxModule.getUsingFetch({
                url: serverApiPath + urls.profileAvatarUrl,
                body: null,
            }).then((response) => {
                return response.json();
            }).then((response) => {
                this.#saveAndEmit(response.result);
            }).catch(() => {
                this.bus.emit(Events.ProfileAvatarResult, Responses.Error);
            });
            return '';
        } else {
            return this._avatarURL;
        }
    }

    /**
     *
     * @param {File} file A file which will uploaded to server
     */
    changeAvatar = (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        AjaxModule.putUsingFetch({
            data: true,
            url: serverApiPath + urls.profileAvatarUrl,
            body: formData,
        }).then(() => {
            AjaxModule.getUsingFetch({
                url: serverApiPath + urls.profileAvatarUrl,
                body: null,
            }).then((response) => {
                return response.json();
            }).then((response) => {
                this.#saveAndEmit(response.result);
            });
        }).catch(() => {
            this.bus.emit(Events.ProfileAvatarResult, Responses.Error);
        });
    }

    /**
     *
     * @param {URL} url url to avatar on file server
     */
    #saveAndEmit = (url) => {
        this.avatarURL = fileServerHost + url;
        this.bus.emit(Events.ProfileAvatarResult, Responses.Success);
    }
}

export default AvatarModule;

