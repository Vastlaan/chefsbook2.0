import { Field } from "../../../styles";

export default function PasswordRepeatNewComponent({
    password,
    setPassword,
    errors,
}) {
    return (
        <Field>
            <label htmlFor="password_old">Repeat New Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.field === "passwordRepeat" && (
                <small>{errors.message}</small>
            )}
        </Field>
    );
}
