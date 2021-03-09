import Link from "next/link";
import { Options, GoBack, ButtonPrimary } from "../../../styles";
import { RiAddLine, RiArrowGoBackLine } from "react-icons/ri";

export default function EventOptions({ day, month, year }) {
    return (
        <Options marginTop="unset" alignItems="center">
            <Link href="/events">
                <GoBack>
                    <RiArrowGoBackLine />
                </GoBack>
            </Link>

            <Link
                href={`/events/createNewEvent?day=${day}&month=${month}&year=${year}`}
            >
                <ButtonPrimary>
                    <RiAddLine />
                    Create New Event
                </ButtonPrimary>
            </Link>
        </Options>
    );
}
