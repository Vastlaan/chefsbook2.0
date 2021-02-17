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

export function validateMimeTypeMulter(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
        return cb(null, true);
    } else {
        cb({ error: "You can upload images only!" });
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
    if (text.length < 4 || text.length > 3500) {
        return {
            type: "error",
            field: "text",
            message: " Text filed must be between 3 and 2000 characters",
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
    if (title.length < 4 || title.length > 500) {
        return {
            type: "error",
            field: "title",
            message: " Text filed must be between 3 and 500 characters",
        };
    }
    return {
        type: "valid",
    };
}
export function validateTime(time) {
    if (time.length < 4 || time.length > 500) {
        return {
            type: "error",
            field: "time",
            message: " Text filed must be between 3 and 500 characters",
        };
    }
    return {
        type: "valid",
    };
}
export function validateIngredients(ingredients) {
    const isTooLong = ingredients.find((ingr) => ingr.length > 150);
    if (isTooLong) {
        return {
            type: "error",
            field: "ingredients",
            message: "Each ingredient must contain no more than 150 characters",
        };
    }
    if (ingredients.length > 80) {
        return {
            type: "error",
            field: "ingredients",
            message: " Max 80 ingredients",
        };
    }
    return {
        type: "valid",
    };
}
