import FLNameModel from './FLNameModel';
import AvatarModel from './AvatarModel';
import EmailModel from './EmailModel';
import CheckAuthModel from './CheckAuthModel';

/**
 * @description Model for Profile in MVP Arch. THIS IS A FACADE!
 */
class ProfileModel {
    /**
     * @description simple Constructor. Creating all elements inside (FACADE)
     */
    constructor() {
        this._fLNameModel = new FLNameModel();
        this._emailModel = new EmailModel();
        this._avatarModel = new AvatarModel();
        this._checkAuthModel = new CheckAuthModel();
    }

    /**
     * @param {string} firstName
     */
    set firstName(firstName) {
        this._fLNameModel._firstName = firstName;
    }

    /**
     * @param {string} lastName
     */
    set lastName(lastName) {
        this._fLNameModel._lastName = lastName;
    }

    /**
     * @param {string} email
     */
    set email(email) {
        this._emailModel._email = email;
    }

    /**
     * @param {string} avatarURL
     */
    set avatarURL(avatarURL) {
        this._avatarModel._avatarURL = avatarURL;
    }

    /**
     * @return {string}
     */
    get firstName() {
        return this._fLNameModel.firstName;
    }

    /**
     *
     * @return {string}
     */
    get lastName() {
        return this._fLNameModel.lastName;
    }

    /**
     *
     * @return {string|*}
     */
    get email() {
        return this._emailModel.email;
    }

    /**
     *
     * @return {string}
     */
    get avatarURL() {
        return this._avatarModel.avatarURL;
    }

    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     */
    changeFirstLastName = (firstName, lastName) => {
        this._fLNameModel.changeFirstLastName(firstName, lastName);
    }

    /**
     * @return {void}
     * @description We will get Name later by emitiing a signal!
     */
    getFirstLastName = () => {
        this._fLNameModel.getFirstLastName();
    }

    /**
     *
     * @param {File} file
     */
    changeAvatar = (file) => {
        this._avatarModel.changeAvatar(file);
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
        this._checkAuthModel.checkAuth();
    }
}

export default ProfileModel;
