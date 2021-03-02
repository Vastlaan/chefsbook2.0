import Link from "next/link";
import { Options, GoBack } from "../../../styles";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function OptionsComponent() {
    return (
        <Options marginTop="0">
            <Link href={`/team`}>
                <GoBack>
                    <RiArrowGoBackLine />
                </GoBack>
            </Link>
        </Options>
    );
}
