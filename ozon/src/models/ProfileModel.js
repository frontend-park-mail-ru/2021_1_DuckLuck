import FLNameModule from './subModules/FLNameModule';
import AvatarModule from './subModules/AvatarModule';
import EmailModule from './subModules/EmailModule';
import CheckAuthModule from './subModules/CheckAuthModule';
import BaseModel from './BaseModel';

/**
 * @description Model for Profile in MVP Arch. THIS IS A FACADE!
 */
class ProfileModel extends BaseModel {
    #fLNameModel;
    #emailModel;
    #avatarModel;
    #checkAuthModel;

    /**
     * @param {Object} bus bus of this mvp part
     * @description simple Constructor. Creating all elements inside (FACADE)
     */
    constructor(bus) {
        super(bus);
        this.#fLNameModel = new FLNameModule(bus);
        this.#emailModel = new EmailModule(bus);
        this.#avatarModel = new AvatarModule(bus);
        this.#checkAuthModel = new CheckAuthModule(bus);
    }

    /**
     * @return {string}
     */
    get firstName() {
        return this.#fLNameModel.firstName;
    }

    /**
     *
     * @return {string}
     */
    get lastName() {
        return this.#fLNameModel.lastName;
    }

    /**
     *
     * @return {string|*}
     */
    get email() {
        return this.#emailModel.email;
    }

    /**
     *
     * @return {string}
     */
    get avatarURL() {
        return this.#avatarModel.avatarURL;
    }

    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     */
    changeFirstLastName = (firstName, lastName) => {
        this.#fLNameModel.changeFirstLastName(firstName, lastName);
    }

    /**
     * @return {void}
     * @description We will get Name later by emitiing a signal!
     */
    getFirstLastName = () => {
        this.#fLNameModel.getFirstLastName();
    }

    /**
     *
     * @param {File} file
     */
    changeAvatar = (file) => {
        this.#avatarModel.changeAvatar(file);
    }

    /**
     * @return {string}
     */
    getAvatar = () => {
        return this.avatarURL;
    }

    /**
     * @description Checking for Auth. Emit signal later
     */
    checkAuth = () => {
        this.#checkAuthModel.checkAuth();
    }

    /**
     * @description Clears all saved data in model
     */
    clear() {
        this.#fLNameModel.clear();
        this.#emailModel.clear();
        this.#avatarModel.clear();
        this.#checkAuthModel.clear();
    }
}

export default ProfileModel;
