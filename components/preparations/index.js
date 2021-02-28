import MainGridComponent from "../main_grid";
import { Dashboard, BigText, Line, TopRow } from "../../styles";

export default function PreparationsComponent() {
    return (
        <MainGridComponent>
            <Dashboard>
                <TopRow>
                    <BigText>Preparations:</BigText>
                </TopRow>
                <Line />
            </Dashboard>
        </MainGridComponent>
    );
}
