import { Field } from "../../../../styles";

export default function Description({ description, setDescription, errors }) {
    return (
        <Field>
            <label htmlFor="description">Description:</label>
            <textarea
                name="description"
                id="description"
                cols="10"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.field === "description" ? (
                <small>{errors.message}</small>
            ) : null}
        </Field>
    );
}
