import { Field } from "../../../../styles";

export default function TextComponent({ text, setText, errors }) {
    return (
        <Field>
            <label htmlFor="text">Text</label>
            <textarea
                name="text"
                id="text"
                cols="10"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            {errors.field === "text" ? <small>{errors.message}</small> : null}
        </Field>
    );
}
