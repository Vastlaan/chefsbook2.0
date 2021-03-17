import { DateTime } from "luxon";
import Layout from "../../globals/layout";
import MainGrid from "../../components/main_grid";
import TableGrid from "../../components/team/schedule/table";
import StaticTableGrid from "../../components/team/schedule/table/tableWithStaticAssets";
import { lightTheme, Dashboard, TopRow, GoBack } from "../../styles";
import componentToPdfBuffer from "../../utils/componentToPdfBuffer";
import { RiArrowGoBackLine } from "react-icons/ri";
import checkIfAuthorized from "../../utils/checkIfAuthorized";

export default function PrintScheduleComponent(props) {
    return (
        <Layout>
            <MainGrid>
                <Dashboard>
                    <TopRow width="100%">
                        <Link href="/team">
                            <GoBack>
                                <RiArrowGoBackLine />
                            </GoBack>
                        </Link>
                    </TopRow>
                    <TableGrid props={props} />
                </Dashboard>
            </MainGrid>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const data = await checkIfAuthorized(ctx);

    const { res } = ctx;

    const buffer = await componentToPdfBuffer(
        <StaticTableGrid
            theme={lightTheme}
            members={data.members}
            dt={DateTime.now()}
        />
    );

    res.setHeader("Content-disposition", 'attachment; filename="schedule.pdf');

    // set content type
    res.setHeader("Content-Type", "application/pdf");

    // output the pdf buffer. once res.end is triggered, it won't trigger the render method
    res.end(buffer);

    return {
        props: {
            theme: { lightTheme },
        },
    };
}
