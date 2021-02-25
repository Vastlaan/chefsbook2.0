import { Field } from "../../../../styles";

export default function DescriptionComponent({ setDescription, errors }) {
    return (
        <Field>
            <label htmlFor="description">Description:</label>
            <textarea
                name="description"
                id="description"
                cols="20"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.field === "description" ? (
                <small>{errors.message}</small>
            ) : null}
        </Field>
    );
}
