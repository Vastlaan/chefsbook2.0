export default function removeZeroFromUnit(unit) {
    console.log(unit.toString().charAt(0));
    if (unit.toString().charAt(0) === "0") {
        console.log(typeof Number(unit.toString().charAt(1)));
        return Number(unit.toString().charAt(1));
    }
    return Number(unit);
}
