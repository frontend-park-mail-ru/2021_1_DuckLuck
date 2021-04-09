import {AjaxModule} from '../../modules/Ajax/Ajax.js';
import {fileServerHost, serverApiPath, urls} from '../../utils/urls/urls';
import BaseModel from '../BaseModel';
import Events from '../../utils/bus/events';
import Responses from '../../utils/bus/responses';

/**
 * @description Model for Avatar Loading/Uploading in MVP Arch
 */
class AvatarModule extends BaseModel {
    #avatarURL

    /**
     *
     * @param {string} URL New URL for avatar
     */
    set avatarURL(URL) {
        this.#avatarURL= URL;
    }

    /**
     *
     * @return {string} Avatar`s URL
     */
    get avatarURL() {
        if (this.#avatarURL !== undefined) {
            return this.#avatarURL;
        }
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.profileAvatarUrl,
            body: null,
        }).then((response) => {
            console.log("AVATAR MODULE STATUS", response.status);
            return response.json();
        }).then((response) => {
            console.log(response.url.String);
            this.#saveAndEmit(response.url.String);
        }).catch(() => {
            this.bus.emit(Events.ProfileAvatarResult, Responses.Error);
        });
        return fileServerHost + urls.defaultAvatar;
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
                this.#saveAndEmit(response.url.String);
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

    /**
     * @description Clears all saved data in model
     */
    clear() {
        this.#avatarURL = undefined;
    }
}

export default AvatarModule;

