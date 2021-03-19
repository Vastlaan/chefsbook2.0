import { Field } from "../../../styles";

export default function PasswordRepeatComponent({ setPasswordRepeat, errors }) {
    return (
        <Field>
            <label htmlFor="passwordRepeat">Repeat password:</label>
            <input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                placeholder="enter password once again"
                autoComplete="current-password"
                onChange={(e) => setPasswordRepeat(e.target.value)}
            />
            {errors.field === "passwordRepeat" && (
                <small>{errors.message}</small>
            )}
        </Field>
    );
}
