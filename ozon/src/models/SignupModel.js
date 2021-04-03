import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../utils/bus/bus.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for Signup in MVP Arch
 */
class SignupModel {
    /**
     *
     * @param {string} email
     * @param {string} password
     */
    signupUser({email, password}) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.signupUrl,
            body: {email, password},
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.result === 'success') {
                Bus.emit(Events.SignupEmitResult, Responses.Success);
            } else {
                Bus.emit(Events.SignupEmitResult, Responses.Error);
            }
        }).catch(() => {
            Bus.emit(Events.SignupEmitResult, Responses.Error);
        });
    }
}

export default SignupModel;
