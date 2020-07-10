export default class FormValidator {
    constructor(form, errorMessages, formSelectors) {
        this.form = form;
        this.errorMessages = errorMessages;
        this.formSelectors = formSelectors;
        this.isValidate = this.isValidate.bind(this);
        this.checkInputValidity = this.checkInputValidity.bind(this);
        this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
        this.handleInputForm = this.handleInputForm.bind(this);
        this.hideErrors = this.hideErrors.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    isValidate(input) {
        input.setCustomValidity('');
        if (input.validity.valueMissing) {
            input.setCustomValidity(this.errorMessages.valueMissing);
            return false;
        }

        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(this.errorMessages.tooShort);
            return false;
        }

        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(this.errorMessages.typeMismatch);
            return false;
        }

        return input.checkValidity();
    }

    checkInputValidity(input) {
        const errorMessage = this.errorElements[input.id];

        const valid = this.isValidate(input);
        errorMessage.textContent = input.validationMessage;

        return valid;
    }

    setSubmitButtonState(isValid) {
        if (isValid) {
            this.button.classList.add(this.formSelectors.buttonActive);
            this.button.removeAttribute('disabled');
        } else {
            this.button.classList.remove(this.formSelectors.buttonActive);
            this.button.setAttribute('disabled', true);
        }
    }

    handleInputForm(evt) {
        this.checkInputValidity(evt.target);

        if (this.inputs.every(this.isValidate)) {
            this.isValid = true;
        } else {
            this.isValid = false;
        }
        this.setSubmitButtonState(this.isValid);
    }

    hideErrors() {
        Object.values(this.errorElements).forEach((error) => error.textContent = '');
    }

    setEventListeners() {

        this.inputs = [...this.form.querySelectorAll(this.formSelectors.input)];

        this.errorElements = {};
        this.inputs.forEach(input => this.errorElements[input.id] = this.form.querySelector(`.popup__${input.name}-error`));

        this.button = this.form.querySelector(this.formSelectors.button);

        this.form.addEventListener('input', this.handleInputForm);
    }
}