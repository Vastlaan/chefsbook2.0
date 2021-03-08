export default function removeZeroFromUnit(unit) {
    if (unit.toString().charAt(0) === "0") {
        return Number(unit.toString().charAt(1));
    }
    return Number(unit);
}
