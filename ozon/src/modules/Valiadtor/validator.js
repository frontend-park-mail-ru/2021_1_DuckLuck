export const isValidForm = (form, specificTypesToCheck = []) => {
    if (!form) {
        return false;
    }

    const inputs = form.getElementsByTagName('input');
    for (const input of inputs) {
        if (specificTypesToCheck.length > 0 && !specificTypesToCheck.includes(input.type)) {
            continue;
        }
        const error = document.getElementById(input.name + '_error');
        if (error) {
            error.innerHTML = '';
        }
    }


    const userInfo = {
        password: '',
    };
    const result = {
        isValid: true,
    };
    for (const input of inputs) {
        if (specificTypesToCheck.length > 0 &&
           !specificTypesToCheck.includes(input.type)
        ) {
            continue;
        }

        if (input.disabled) {
            continue;
        }

        let errField = document.getElementById(input.name + '_error');
        if (errField === null) {
            errField = document.getElementById(input.id + '_error');
        }

        switch (input.type) {
        case 'text':
            if (input.name.includes('firstName') ||
                input.name.includes('lastName')
            ) {
                nameValidation(input, result, errField);
            }
            break;
        case 'email':
            emailValidation(input, result, errField);
            break;
        case 'file':
            fileValidation(input, result, errField);
            break;
        case 'password':
            switch (input.id) {
            case 'password':
                passwordValidation(input, result, errField, userInfo);
                break;
            case 'repeat_password':
                passwordRepeatValidation(input, result, errField, userInfo.password);
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

const nameValidation = (input, result, errField) => {
    const isValidName = /^[a-zA-Zа-яА-Я]+$/.test(input.value);
    if (!isValidName) {
        result.isValid = false;
        errField.innerHTML = 'Incorrect or empty First Name!';
    }
};

const emailValidation = (input, result, errField) => {
    const isValidEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
    if (!isValidEmail) {
        result.isValid = false;
        errField.innerHTML = 'Incorrect or Email!';
    }
};

const passwordValidation = (input, result, errField, userInfo) => {
    const isPasswordValid = input.value.length >= 3 && input.value.length <= 20;
    if (!isPasswordValid) {
        result.isValid = false;
        errField.innerHTML = 'Password is too short or too long!';
    }
    userInfo.password = input.value;
};

const passwordRepeatValidation = (input, result, errField, password) => {
    const value = input.value;
    if (value !== password) {
        result.isValid = false;
        errField.innerHTML = 'Repeat password doesnt match!';
    } else if (input.value.length < 3 || input.value.length > 20) {
        result.isValid = false;
        errField.innerHTML = 'Repeat password is too short or too long!';
    }
};

const MAX_FILE_SIZE = 10e6;
const fileValidation = (input, result, errField) => {
    const file = input.files[0];
    const isValidFile = file !== undefined &&
                         file.size < MAX_FILE_SIZE && /.*\.(jpeg|png|jpg)$/i.test(file.name);
    if (!isValidFile) {
        result.isValid = false;
        errField.innerHTML = 'Incorrect file or file size!';
    }
};
