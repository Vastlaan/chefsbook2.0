import { Field } from "../../../styles";

export default function PasswordNewComponent({
    password,
    setPassword,
    errors,
}) {
    return (
        <Field>
            <label htmlFor="password_old">New Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.field === "password" && <small>{errors.message}</small>}
        </Field>
    );
}
