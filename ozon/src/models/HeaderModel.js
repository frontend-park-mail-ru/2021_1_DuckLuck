import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Model for Header in MVP Arch
 */
class HeaderModel extends BaseModel {
    #categories;
    #currentCategoryIndex = 0;

    /**
     * @return {Object} categories
     */
    get categories() {
        return this.#categories;
    }

    /**
     * @return {Number} current category index
     */
    get currentCategoryIndex() {
        return this.#currentCategoryIndex;
    }

    /**
     *
     */
    set currentCategoryIndex(index) {
        this.#currentCategoryIndex = index;
    }

    /**
     *
     * @description Loads item IN MODEL!
     */
    loadHeader() {
        AjaxModule.getUsingFetch({
            url: serverApiPath + '/category',
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            this.#categories = parsedJson;
            Bus.globalBus.emit(Events.HeaderChangeCatalogID, parsedJson[0].id);
            this.bus.emit(Events.HeaderLoaded, Responses.Success);
        }).catch(() => {
            this.bus.emit(Events.HeaderLoaded, Responses.Error);
        });
    }
}

export default HeaderModel;
