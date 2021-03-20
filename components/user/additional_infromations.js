import Link from "next/link";
import { FlexCol, SmallText } from "../../styles";

export default function AdditionalInformationsComponent() {
    return (
        <FlexCol>
            <SmallText>Additional informations:</SmallText>
            <Link href="/cookies">
                <SmallText underline>Cookie policy</SmallText>
            </Link>
            <Link href="/terms">
                <SmallText underline>Terms & Conditions</SmallText>
            </Link>
        </FlexCol>
    );
}
