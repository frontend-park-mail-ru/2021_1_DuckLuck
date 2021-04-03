import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../utils/bus/bus';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for getting/changing Users Email in MVP Arch
 */
class EmailModel {
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
                Bus.emit(Events.ProfileEmailResult, Responses.Success);
            }).catch(() => {
                Bus.emit(Events.ProfileEmailResult, Responses.Error);
            });
            return '';
        } else {
            return this._email;
        }
    }
}

export default EmailModel;
