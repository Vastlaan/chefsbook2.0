import { Field } from "../../../styles";

export default function PasswordOldComponent({
    password,
    setPassword,
    errors,
}) {
    return (
        <Field>
            <label htmlFor="password_old">Old Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.field === "passwordOld" && <small>{errors.message}</small>}
        </Field>
    );
}
