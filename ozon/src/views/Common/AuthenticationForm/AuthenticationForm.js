import AuthenticationFormTemplate from './AuthenticationForm.hbs';


/**
 * @class AuthenticationForm
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class AuthenticationForm {
    constructor() {
        this.objectType = 'authenticationForm';
    };

    /**
     *
     * @param {string} formType Type of templated Authentication form, which will generate
     * @param {Object} formData Array of objects which will rendered inside template
     * @return {string} HTML string, which will generated after templating
     */
    getHtmlString = ({formType, formData}) => {
        return AuthenticationFormTemplate({
            formType: formType,
            formData: formData,
        });
    };
}
