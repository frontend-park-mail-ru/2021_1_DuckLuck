import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';
import {Bus} from '../utils/bus/bus.js';

/**
 * @description Model for Log in User in MVP Arch
 */
class LoginModel extends BaseModel {
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
            if (response.status === HTTPResponses.Success) {
                this.bus.emit(Events.LoginEmitResult, Responses.Success);
                Bus.globalBus.emit(Events.LoginEmitResult, Responses.Success);
            } else {
                this.bus.emit(Events.LoginEmitResult, Responses.Error);
            }
        }).catch(() => {
            this.bus.emit(Events.LoginEmitResult, Responses.Error);
        });
    }
}

export default LoginModel;
