import { List, Field } from "../../../styles";

export default function ListOfMembersComponent({
    members,
    selectedMembers,
    setSelectedMembers,
}) {
    return (
        <List>
            {members.map((m, i) => {
                return (
                    <Field direction="row" align="center" key={`member-${i}`}>
                        <input
                            type="checkbox"
                            name="member"
                            checked={selectedMembers.includes(m.email)}
                            onChange={() =>
                                setSelectedMembers((prevState) => {
                                    if (prevState.includes(m.email)) {
                                        return prevState.filter(
                                            (each) => each !== m.email
                                        );
                                    } else {
                                        return [...prevState, m.email];
                                    }
                                })
                            }
                        />
                        <label htmlFor="member">
                            &nbsp;{m.full_name} ({m.email})
                        </label>
                    </Field>
                );
            })}
        </List>
    );
}
