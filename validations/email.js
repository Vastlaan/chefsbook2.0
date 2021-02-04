export default function validateEmail(email) {
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
