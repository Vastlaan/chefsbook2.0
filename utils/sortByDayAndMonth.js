export default function sortByDayAndMonth(prev, next) {
    if (prev.month === next.month) {
        return prev.day - next.day;
    } else {
        return prev.month - next.month;
    }
}
