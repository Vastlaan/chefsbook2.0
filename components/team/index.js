import Link from "next/link";
import MainGridComponent from "../main_grid";
import Schedule from "./schedule";
import Members from "./members";
import { Line, Dashboard, ButtonContainer, ButtonPrimary } from "../../styles";

export default function TeamComponent() {
    return (
        <MainGridComponent>
            <Dashboard>
                <Schedule />
                <Line />
                <Members />
                <Line />
            </Dashboard>
        </MainGridComponent>
    );
}
