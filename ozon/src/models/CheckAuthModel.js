import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import Bus from '../utils/bus/bus';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

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
                Bus.emit(Events.ProfileCheckAuthResult, Responses.Error);
                return;
            }
            Bus.emit(Events.ProfileCheckAuthResult, Responses.Success);
        }).catch(() => {
            Bus.emit(Events.ProfileCheckAuthResult, Responses.Error);
        });
    }
}

export default CheckAuthModel;
