import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../bus.js';

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
                Bus.emit('signup-emit-result', 'success');
            } else {
                Bus.emit('signup-emit-result', 'failure to signup');
            }
        });
    }
}

export default SignupModel;
