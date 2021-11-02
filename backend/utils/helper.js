import moment from "moment-timezone";

export const helper = {
    time: () => {
        return {
            today: moment().tz("Asia/Tokyo").format("YYYY-MM-DD"),
            yesterday: moment().tz("Asia/Tokyo").subtract(1, 'day').format("YYYY-MM-DD"),
            thisMonth: moment().tz("Asia/Tokyo").format("YYYY-MM"),
        };
    }
};