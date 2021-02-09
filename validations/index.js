export function validateEmail(email) {
    const validationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!validationRegex.test(email)) {
        return {
            type: "error",
            field: "email",
            message: "E-mail is not valid",
        };
    } else {
        return {
            type: "valid",
        };
    }
}

export function validatePassword(password, passwordRepeat) {
    const validationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!validationRegex.test(password)) {
        return {
            type: "error",
            field: "password",
            message:
                "password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        };
    } else if (passwordRepeat && password !== passwordRepeat) {
        return {
            type: "error",
            field: "passwordRepeat",
            message: "The password does not match the one inserted above",
        };
    } else {
        return {
            type: "valid",
        };
    }
}

export function validateMimeType(file) {
    if (file.type.split("/")[0] !== "image") {
        return {
            type: "error",
            field: "file",
            message: "File must be an image with extension .jpg .png .jpeg",
        };
    }
    return {
        type: "valid",
    };
}

export function validateText(text) {
    if (!text) {
        return {
            type: "error",
            field: "text",
            message: "Text field must be provided",
        };
    }
    return {
        type: "valid",
    };
}

export function validateTitle(title) {
    if (!title) {
        return {
            type: "error",
            field: "title",
            message: "Title field must be provided",
        };
    }
    return {
        type: "valid",
    };
}
