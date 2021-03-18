import { DateTime } from "luxon";
import StaticTableGrid from "../../../components/team/schedule/table/tableWithStaticAssets";
import { lightTheme } from "../../../styles";
import componentToPdfBuffer from "../../../utils/componentToPdfBuffer";
import checkIfAuthorized from "../../../utils/checkIfAuthorized";

export default async function handler(req, res) {
    try {
        const ctx = { req, res };
        const data = await checkIfAuthorized(ctx);

        const { day, month, year } = req.body;

        const buffer = await componentToPdfBuffer(
            <StaticTableGrid
                theme={lightTheme}
                members={data.members}
                dt={DateTime.fromObject({ day, month, year })}
            />
        );

        res.setHeader(
            "Content-disposition",
            'attachment; filename="schedule.pdf'
        );

        // set content type
        res.setHeader("Content-Type", "application/pdf");

        // output the pdf buffer. once res.end is triggered, it won't trigger the render method
        res.send(buffer);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
