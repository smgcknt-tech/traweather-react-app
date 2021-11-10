import moment from "moment-timezone";
moment.tz.setDefault('Asia/Tokyo');

export const helper = {
    time: () => {
        return {
            today: moment().format("YYYY-MM-DD"),
            yesterday: moment().subtract(1, 'day').format("YYYY-MM-DD"),
            thisMonth: moment().format("YYYY-MM"),
            thisMonday: moment().day(1).format("YYYY-MM-DD"),
        };
    }
};