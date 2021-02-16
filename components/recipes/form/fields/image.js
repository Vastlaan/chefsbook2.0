import styled from "styled-components";
import { Field } from "../../../../styles";
import { RiAddCircleLine } from "react-icons/ri";
import { validateMimeType } from "../../../../validations";

export default function ImageComponent({
    fileImage,
    setFileImage,
    file,
    setFile,
    errors,
}) {
    return (
        <>
            <ImageField>
                <ImageBox>
                    {file ? (
                        <img src={fileImage} alt="image to upload" />
                    ) : (
                        <p>No photo added</p>
                    )}
                </ImageBox>
                <label htmlFor="photo">
                    <RiAddCircleLine />
                    Add Photo
                </label>

                <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={(e) => {
                        const result = validateMimeType(e.target.files[0]);
                        if (result.type === "error") {
                            return setErrors(result);
                        }
                        setFileImage(URL.createObjectURL(e.target.files[0]));
                        setFile(e.target.files[0]);
                    }}
                />
            </ImageField>
            {file ? <FileName>{file.name}</FileName> : null}
            {errors.field === "file" ? <small>{errors.message}</small> : null}
        </>
    );
}
const ImageField = styled(Field)`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0;

    label {
        max-width: 25rem;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        margin-left: 1.4rem;

        svg {
            margin-right: 1.4rem;
            font-size: 2.7rem;
        }

        &:hover {
            color: ${(p) => p.theme.grey3};
        }
    }

    input {
        padding: 0;
        margin: 0;
        height: 0;
        width: 0;
        opacity: 0;
        visibility: hidden;
    }
`;
const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    border-radius: 5px;
    border: 1px solid ${(p) => p.theme.grey1};
    overflow: hidden;

    img {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    p {
        margin: 0.4rem;
        text-align: center;
        max-width: 100%;
        font-size: 1.4rem;
        color: ${(p) => p.theme.grey3};
    }
`;
const FileName = styled.p`
    font-size: 1.4rem;
    color: ${(p) => p.theme.grey3};
`;
