import {AjaxModule} from '../../modules/Ajax/Ajax.js';
import {serverApiPath, urls} from '../../utils/urls/urls';
import BaseModel from '../BaseModel';
import Events from '../../utils/bus/events';
import Responses from '../../utils/bus/responses';

/**
 * @description Model for getting/changing Users First/Last name in MVP Arch
 */
class FLNameModule extends BaseModel {
    #firstName;
    #lastName;

    /**
     * @param {string} firstName
     */
    set firstName(firstName) {
        this.#firstName= firstName;
    }

    /**
     * @param {string} lastName
     */
    set lastName(lastName) {
        this.#lastName= lastName;
    }

    /**
     *
     * @return {string} first name
     */
    get firstName() {
        return this.#firstName;
    }

    /**
     *
     * @return {string} last name
     */
    get lastName() {
        return this.#lastName;
    }

    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     * @description Sending Ajax request for chaning Users first and last name on server
     */
    changeFirstLastName = (firstName, lastName) => {
        AjaxModule.putUsingFetch({
            url: serverApiPath + urls.profileUrl,
            body: {first_name: firstName, last_name: lastName},
        }).then(() => {
            this.firstName = firstName;
            this.lastName = lastName;
            this.bus.emit(Events.ProfileFLNameResult, Responses.Success);
        }).catch(() => {
            this.bus.emit(Events.ProfileFLNameResult, Responses.Error);
        });
    }

    /**
     * @description Sends signal of refreshed first and last names in Model.
     */
    getFirstLastName = () => {
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.profileUrl,
            body: null,
        }).then((response) => {
            return response.json();
        }).then((response) => {
            this.firstName = response.first_name;
            this.lastName = response.last_name;
            this.bus.emit(Events.ProfileFLNameResult, Responses.Success);
        }).catch(() => {
            this.bus.emit(Events.ProfileFLNameResult, Responses.Error);
        });
    }
}

export default FLNameModule;
