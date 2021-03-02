import { Field } from "../../../styles";

export default function NameComponent({ email, setEmail }) {
    return (
        <Field>
            <label htmlFor="fullName">Email:</label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </Field>
    );
}
