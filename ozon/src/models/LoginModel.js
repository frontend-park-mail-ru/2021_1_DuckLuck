import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../utils/bus/bus.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for Log in User in MVP Arch
 */
class LoginModel {
    /**
     *
     * @param {string} email
     * @param {string} password
     */
    loginUser({email, password}) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.loginUrl,
            body: {email, password},
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.result === Responses.Success) {
                Bus.emit(Events.LoginEmitResult, Responses.Success);
            } else {
                Bus.emit(Events.LoginEmitResult, Responses.Error);
            }
        }).catch(() => {
            Bus.emit(Events.LoginEmitResult, Responses.Error);
        });
    }
}

export default LoginModel;
