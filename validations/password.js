export default function validatePassword(password, passwordRepeat) {
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
