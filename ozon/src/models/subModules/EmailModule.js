import {AjaxModule} from '../../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../../utils/urls/urls';
import BaseModel from '../BaseModel';
import Events from '../../utils/bus/events';
import Responses from '../../utils/bus/responses';

/**
 * @description Model for getting/changing Users Email in MVP Arch
 */
class EmailModule extends BaseModel {
    #email

    /**
     *
     * @return {string|*} User email
     */
    get email() {
        if (this.#email !== undefined) {
            return this.#email;
        }
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.profileUrl,
            body: null,
        }).then((response) => {
            return response.json();
        }).then((response) => {
            this.#email = response.email;
            this.bus.emit(Events.ProfileEmailResult, Responses.Success);
        }).catch(() => {
            this.bus.emit(Events.ProfileEmailResult, Responses.Error);
        });
        return '';
    }
}

export default EmailModule;