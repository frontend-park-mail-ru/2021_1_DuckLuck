export const isValidForm = (form, specificTypesToCheck = []) => {
    if (!form) {
        return false;
    }

    const userInfo = {
        password: '',
    };
    const result = {
        isValid: true,
    };

    for (const input of form.getElementsByTagName('input')) {
        if (specificTypesToCheck.length > 0 &&
           !specificTypesToCheck.includes(input.type)
        ) {
            continue;
        }

        if (input.disabled) {
            continue;
        }

        switch (input.type) {
        case 'text':
            if (input.name.includes('firstName') ||
                input.name.includes('lastName')
            ) {
                nameValidation(input, result);
            }
            break;
        case 'email':
            emailValidation(input, result);
            break;
        case 'file':
            fileValidation(input, result);
            break;
        case 'password':
            switch (input.id) {
            case 'password':
                passwordValidation(input, result, userInfo);
                break;
            case 'repeat_password':
                passwordRepeatValidation(input, result, userInfo.password);
                break;
            default:
                break;
            }
            break;

        default:
            console.error('unsupported type of input!');
            break;
        }
    }

    return result.isValid;
};

const nameValidation = (input, result) => {
    const isValidName = /^[a-zA-Zа-яА-Я]+$/.test(input.value);
    if (!isValidName) {
        result.isValid = false;
    }
};

const emailValidation = (input, result) => {
    const isValidEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
    if (!isValidEmail) {
        result.isValid = false;
    }
};

const passwordValidation = (input, result, userInfo) => {
    const isPasswordValid = input.value.length >= 3 && input.value.length <= 20;
    if (!isPasswordValid) {
        result.isValid = false;
    }
    userInfo.password = input.value;
};

const passwordRepeatValidation = (input, result, password) => {
    const value = input.value;
    if (value !== password) {
        result.isValid = false;
    } else if (input.value.length < 3 || input.value.length > 20) {
        result.isValid = false;
    }
};

const MAX_FILE_SIZE = 10e6;
const fileValidation = (input, result) => {
    const file = input.files[0];
    const isValidFile = file !== undefined &&
                         file.size < MAX_FILE_SIZE && /.*\.(jpeg|png|jpg)$/i.test(file.name);
    if (!isValidFile) {
        result.isValid = false;
    }
};
