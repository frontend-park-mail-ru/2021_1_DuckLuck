import {AjaxModule} from '../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../bus.js';

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
            if (response.result === 'success') {
                Bus.emit('login-emit-result', 'success');
            } else {
                Bus.emit('login-emit-result', 'failure to login');
            }
        });
    }
}

export default LoginModel;
