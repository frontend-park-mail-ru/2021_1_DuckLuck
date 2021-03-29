import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../bus';

/**
 * @description Model for Checking for Users Authorization in MVP Arch
 */
class CheckAuthModel {
    /**
     * @description Sending Ajax. Then emits signal of success/failure of Authorization
     */
    checkAuth() {
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.profileUrl,
            body: null,
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.error === 'user is unauthorized') {
                Bus.emit('check-auth-result', 'error');
                return;
            }
            Bus.emit('check-auth-result', 'success');
        });
    }
}

export default CheckAuthModel;
