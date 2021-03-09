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

    let isValid = true;
    for (const input of inputs) {
        if (specificTypesToCheck.length > 0 && !specificTypesToCheck.includes(input.type)) {
            continue;
        }
        if (input.disabled === true) {
            continue;
        }
        const errField = document.getElementById(input.name + '_error');
        if (input.type === 'text') {
            if (input.name.includes('firstName') && ((isValid = nameValidation(input)) !== true)) {
                errField.innerHTML = 'Incorrect or empty First Name!';
            } else if (input.name.includes('lastName') && ((isValid = nameValidation(input)) !== true)) {
                errField.innerHTML = 'Incorrect or empty Last Name!';
            }
        } else if (input.type === 'email') {
            if ((isValid = emailValidation(input)) !== true) {
                errField.innerHTML = 'Incorrect Email!';
            }
        } else if (input.type === 'file') {
            if ((isValid = fileValidation(input)) !== true) {
                errField.innerHTML = 'Incorrect File!';
            }
        }
    }

    return isValid;
};

const loginValidation = (input) => {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(input.value);
};

const nameValidation = (input) => {
    return /^[a-zA-Zа-яА-Я]+$/.test(input.value);
};

const emailValidation = (input) => {
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
};

const passwordValidation = (input) => {
    return input.value.length >= 6 && input.value.length <= 10;
};

const MAX_FILE_SIZE = 10e6;
const fileValidation = (input) => {
    const file = input.files[0];
    if (typeof file === 'undefined') {
        return true;
    }
    return file.size < MAX_FILE_SIZE && /.*\.(jpeg|png|jpg)$/i.test(file.name);
};
