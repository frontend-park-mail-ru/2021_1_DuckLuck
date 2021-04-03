import {AjaxModule} from '../../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../../utils/urls/urls';
import BaseModel from '../BaseModel';
import Events from '../../utils/bus/events';
import Responses from '../../utils/bus/responses';

/**
 * @description Model for getting/changing Users Email in MVP Arch
 */
class EmailModule extends BaseModel {
    /**
     * @param {Object} bus bus of this mvp part
     */
    constructor(bus) {
        super(bus);
    }

    /**
     *
     * @return {string|*} User email
     */
    get email() {
        if (this._email === undefined) {
            AjaxModule.getUsingFetch({
                url: serverApiPath + urls.profileUrl,
                body: null,
            }).then((response) => {
                return response.json();
            }).then((response) => {
                this._email = response.email;
                this.bus.emit(Events.ProfileEmailResult, Responses.Success);
            }).catch(() => {
                this.bus.emit(Events.ProfileEmailResult, Responses.Error);
            });
            return '';
        } else {
            return this._email;
        }
    }
}

export default EmailModule;
