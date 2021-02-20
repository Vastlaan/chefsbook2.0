import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import {
    respond,
    Dashboard,
    BigText,
    Line,
    Field,
    FlexCol,
    FlexRow,
    ImageContainerRound,
    ButtonSecondary,
    PlainButton,
    Text,
    Text2,
    SmallText,
    Options,
    Edit,
} from "../../styles";
import { RiAddLine, RiEditLine } from "react-icons/ri";

export default function UserSettingsComponent({ user }) {
    return (
        <MainGridComponent>
            <Dashboard>
                <BigText>Your Profile:</BigText>
                <Line />

                <FlexRow>
                    <Text2>
                        E-mail: <span>{user.email}</span>
                    </Text2>

                    <Edit>
                        <PlainButton>
                            <RiEditLine />
                        </PlainButton>
                    </Edit>
                </FlexRow>

                <Line />
                <FlexRow>
                    <Text2>
                        First Name: <span>{user.name}</span>
                    </Text2>

                    <Edit>
                        <PlainButton>
                            <RiEditLine />
                        </PlainButton>
                    </Edit>
                </FlexRow>
                <Line />

                <FlexRow>
                    <Text2>
                        Last Name: <span>{user.surname}</span>
                    </Text2>

                    <Edit>
                        <PlainButton>
                            <RiEditLine />
                        </PlainButton>
                    </Edit>
                </FlexRow>

                <Line />
                <FlexCol>
                    <Text2 htmlFor="photo">Profile Picture:</Text2>
                    <ImageContainerRound>
                        {user.account_photo_url ? (
                            <img
                                src={user.account_photo_url}
                                alt="user photo"
                            />
                        ) : (
                            <Text>No Photo Yet</Text>
                        )}
                    </ImageContainerRound>
                    <Line />
                </FlexCol>
                <FlexRow>
                    <SmallText>
                        Account created at: <span>{user.created_at}</span>
                    </SmallText>
                </FlexRow>

                <FlexRow>
                    <ButtonSecondary>Save changes</ButtonSecondary>
                </FlexRow>
            </Dashboard>
        </MainGridComponent>
    );
}

const Posts = styled.div`
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${() => respond("m", "align-items: flex-start;")}
`;
