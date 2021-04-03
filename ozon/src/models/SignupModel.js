import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for Signup in MVP Arch
 */
class SignupModel extends BaseModel {
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
    signupUser({email, password}) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.signupUrl,
            body: {email, password},
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.result === 'success') {
                this.bus.emit(Events.SignupEmitResult, Responses.Success);
            } else {
                this.bus.emit(Events.SignupEmitResult, Responses.Error);
            }
        }).catch(() => {
            this.bus.emit(Events.SignupEmitResult, Responses.Error);
        });
    }
}

export default SignupModel;
