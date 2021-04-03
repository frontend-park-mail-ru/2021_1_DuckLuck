import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for Log in User in MVP Arch
 */
class LoginModel extends BaseModel {
    /**
     * @param {Object} bus bus of this mvp part
     */
    constructor(bus) {
        super(bus);
    }

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
                this.bus.emit(Events.LoginEmitResult, Responses.Success);
            } else {
                this.bus.emit(Events.LoginEmitResult, Responses.Error);
            }
        }).catch(() => {
            this.bus.emit(Events.LoginEmitResult, Responses.Error);
        });
    }
}

export default LoginModel;
