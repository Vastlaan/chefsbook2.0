import { Field } from "../../../styles";

export default function NameComponent({ fullName, setFullName, errors }) {
    return (
        <Field>
            <label htmlFor="fullName">Full Name*:</label>
            <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            {(errors.field = "name" && <small>{errors.message}</small>)}
        </Field>
    );
}
