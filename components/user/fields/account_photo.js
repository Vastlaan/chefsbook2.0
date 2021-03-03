import styled from "styled-components";
import {
    respond,
    Line,
    Field,
    ImageContainerRound,
    ButtonSecondary,
    PlainButton,
    Text2,
    SmallText,
    Edit,
} from "../../../styles";
import { validateMimeType } from "../../../validations";
import { RiAddCircleLine } from "react-icons/ri";

export default function ImageComponent({
    userAccountPhoto,

    setAccountPhoto,
    accountPhotoBlob,
    setAccountPhotoBlog,
    errors,
    setErrors,
}) {
    return (
        <ImageField>
            <label>Profile Picture:</label>
            <ImageContainerRound>
                {accountPhotoBlob ? (
                    <img src={accountPhotoBlob} alt="user's photo" />
                ) : userAccountPhoto ? (
                    <img src={userAccountPhoto} alt="user's photo" />
                ) : (
                    <label htmlFor="photo">No Photo Yet</label>
                )}
            </ImageContainerRound>
            <label htmlFor="photo">
                <RiAddCircleLine />
                {userAccountPhoto || userPhotoBlob
                    ? "Change Photo"
                    : "Add Photo"}
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
                    setAccountPhotoBlog(URL.createObjectURL(e.target.files[0]));
                    setAccountPhoto(e.target.files[0]);
                }}
            />
            {errors.field === "file" && <small>{errors.message}</small>}
            <Line />
        </ImageField>
    );
}

const ImageField = styled(Field)`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 0;

    label {
        max-width: 25rem;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;

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
const FieldRow = styled(Field)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;

    label {
        margin: 0;
    }
    input {
        margin: 0 1.4rem;
    }
`;
