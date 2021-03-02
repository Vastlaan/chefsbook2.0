export default function addZero(unit) {
    return unit.toString().length === 1 ? `0${unit}` : unit.toString();
}
