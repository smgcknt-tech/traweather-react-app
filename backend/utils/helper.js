import iconv from 'iconv-lite';
import papa from "papaparse";
import request from "request";
import moment from "moment"

export const helper = {
    time: () => {
        return {
            today : moment().format("YYYY-MM-DD"),
            yesterday: moment().subtract(1, 'day').format("YYYY-MM-DD"),
        }
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
    },
};