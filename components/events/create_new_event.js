import MainGridComponent from "../main_grid";
import Form from "./form";

export default function EventsComponent({ day, month, year }) {
    return (
        <MainGridComponent>
            <Form day={day} month={month} year={year} />
        </MainGridComponent>
    );
}
