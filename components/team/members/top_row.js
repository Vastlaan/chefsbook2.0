import styled from "styled-components";
import Link from "next/link";
import { BigText, ButtonPrimary } from "../../../styles";
import { RiAddLine } from "react-icons/ri";

export default function TopRowComponent() {
    return (
        <TopRowWide>
            <BigText>Members:</BigText>

            <Link href="/team/createMember">
                <ButtonPrimary>
                    <RiAddLine />
                    Add New Member
                </ButtonPrimary>
            </Link>
        </TopRowWide>
    );
}
const TopRowWide = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
