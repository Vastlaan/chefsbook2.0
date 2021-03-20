import MainGridComponent from "../main_grid";
import Top from "./top";
import UpdateUserProfile from "./update_profie";
import AdditionalInfromations from "./additional_infromations";
import ChangePassword from "./change_password";
import DangerZone from "./danger_zone";
import { Dashboard, Line } from "../../styles";
import { DateTime } from "luxon";

export default function UserSettingsComponent({ user }) {
    const created = DateTime.fromISO(user.created_at).toLocaleString();

    return (
        <MainGridComponent>
            <Dashboard>
                <Top created={created} />

                <Line />

                <UpdateUserProfile user={user} />

                <Line />

                <ChangePassword />

                <Line />

                <DangerZone />

                <Line />

                <AdditionalInfromations />
            </Dashboard>
        </MainGridComponent>
    );
}
