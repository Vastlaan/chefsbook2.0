import { Field } from "../../styles";

export default function EmailComponent({ email, setEmail, errors }) {
    return (
        <Field>
            <label htmlFor="email">E-mail:</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="e-mail"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.field === "email" && <small>{errors.message}</small>}
        </Field>
    );
}
