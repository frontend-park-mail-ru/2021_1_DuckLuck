import AuthenticationFormTemplate from './AuthenticationForm.hbs';

export class AuthenticationForm {
    constructor() {
        this.objectType = 'authenticationForm';
    };

    getHtmlString = ({formType, formData}) => {
        return AuthenticationFormTemplate({
            formType: formType,
            formData: formData,
        });
    };
}
