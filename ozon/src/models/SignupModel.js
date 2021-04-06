import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';

import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';

/**
 * @description Model for Signup in MVP Arch
 */
class SignupModel extends BaseModel {
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
            if (response.status === HTTPResponses.Created) {
                this.bus.emit(Events.SignupEmitResult, Responses.Success);
            } else {
                this.bus.emit(Events.SignupEmitResult, Responses.Error);
            }
        }).catch((err) => {
            this.bus.emit(Events.SignupEmitResult, Responses.Error);
        });
    }
}

export default SignupModel;
