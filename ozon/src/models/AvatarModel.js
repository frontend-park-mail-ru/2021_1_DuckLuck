import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {fileServerHost, serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../bus.js';

/**
 * @description Model for Avatar Loading/Uploading in MVP Arch
 */
class AvatarModel {
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
                this.avatarURL = fileServerHost + response.result;
                Bus.emit('profile-avatar-result', 'success');
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
                this.avatarURL = fileServerHost + response.result;
                Bus.emit('profile-avatar-result', 'success');
            });
        }).catch((err) => {
            console.error(err);
        });
    }
}

export default AvatarModel;

