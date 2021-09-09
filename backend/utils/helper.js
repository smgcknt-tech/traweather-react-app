import iconv from 'iconv-lite';
import papa from "papaparse";
import request from "request";
import moment from "moment"

export const helper = {
    now: () => {
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        return now;
    },
    get_today: () => {
        let today = new Date();
        const date = today.getFullYear() + "0" + (today.getMonth() + 1) + "0" + today.getDate()
        const result = moment(date).format("YYYY-MM-DD");
        return result;
    },
    csv_stream: async (url, callback) => {
        return new Promise((resolve, reject) => {
            let data = [];
            const parseStream = papa.parse(papa.NODE_STREAM_INPUT, {
                columns: true,
            });
            const dataStream = request
                .get(url)
                .pipe(iconv.decodeStream('Shift_JIS'))
                .pipe(parseStream);
            parseStream.on("data", (chunk) => {
                data.push(chunk);
            })
            dataStream.on("finish", async () => {
                await callback(data)
                    .then((res) => { resolve(res) })
                    .catch((err) => { console.log(err.message) })
            })
            dataStream.on("error", (err) => {
                reject(err)
            })
        })
    }
};