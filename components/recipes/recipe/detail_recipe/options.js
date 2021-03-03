import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../../../../store";
import Modal from "../../../modals/modal_before_delete";
import { Options, Option, Edit, GoBack, PlainButton } from "../../../../styles";
import {
    RiDeleteBin2Line,
    RiEditLine,
    RiArrowGoBackLine,
} from "react-icons/ri";

export default function OptionsComponent({ recipe }) {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    const [displayModal, setDisplayModal] = useState(false);

    console.log(recipe);

    function deleteRecipe() {
        fetch(
            `/api/recipes/deleteRecipe?id=${recipe.id}&path=${recipe.photo_url}`
        )
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "setRecipes", payload: data.recipes });
                return router.push("/recipes");
            })
            .catch((e) => console.error(e));
    }

    return (
        <Options marginTop="unset">
            <Link href="/recipes">
                <GoBack>
                    <RiArrowGoBackLine />
                </GoBack>
            </Link>

            <PlainButton>
                <Link href={`/recipes/edit/${recipe.id}`}>
                    <Edit>
                        <RiEditLine />
                    </Edit>
                </Link>
            </PlainButton>
            <PlainButton onClick={() => setDisplayModal(true)}>
                <Option>
                    <RiDeleteBin2Line />
                </Option>
            </PlainButton>
            <small>created at: {recipe.created_at.split("T")[0]}</small>
            {displayModal && (
                <Modal
                    setModal={setDisplayModal}
                    deleteItem={deleteRecipe}
                    message="Are you sure you want to delete this recipe?"
                />
            )}
        </Options>
    );
}
