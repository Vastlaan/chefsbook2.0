import { Field } from "../../../../styles";

export default function TitleComponent({ title, setTitle, errors }) {
    return (
        <Field>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {errors.field === "title" ? <small>{errors.message}</small> : null}
        </Field>
    );
}
