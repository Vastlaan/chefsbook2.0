import MainGridComponent from "../main_grid";
import Date from "../date";
import LandingGrid from "./grid";
import { Line, Dashboard } from "../../styles";

export default function Landing() {
    return (
        <MainGridComponent>
            <Dashboard>
                <Date />
                <Line />
                <LandingGrid />
            </Dashboard>
        </MainGridComponent>
    );
}
