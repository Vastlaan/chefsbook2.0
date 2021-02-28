import MainGridComponent from "../main_grid";
import Schedule from "./schedule";
import { Line, Dashboard } from "../../styles";

export default function TeamComponent() {
    return (
        <MainGridComponent>
            <Dashboard>
                <Schedule />
                <Line />
            </Dashboard>
        </MainGridComponent>
    );
}
