import moment from "moment"

export const helper = {
    format_dates: (a,...rest) => {
        const arr = [a, ...rest]
        const dates = arr.map(x => moment(x).format("YYYY/MM/DD"));
        return dates;
    }
};