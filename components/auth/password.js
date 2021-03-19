import { Field } from "../../styles";

export default function PasswordComponent({ password, setPassword, errors }) {
    return (
        <Field>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.field === "password" && <small>{errors.message}</small>}
        </Field>
    );
}
