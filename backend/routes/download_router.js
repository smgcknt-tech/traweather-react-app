import express from 'express';
import aws from 'aws-sdk';
import csv from 'csvtojson';
import iconv from 'iconv-lite';
import { api_post_model } from '../models/api_post_model.js';
export const download_router = express.Router();
const s3 = new aws.S3();

export const dataSets = [
    ['traweather-bucket/csv', "japan-all-stock-prices-2.csv", api_post_model.upsert_latest_stock],
];
export const downloadCsv = async (dataSets) => {
    try {
        dataSets.forEach(async (data) => {
            const file = s3
                .getObject({ Bucket: data[0], Key: data[1], })
                .createReadStream()
                .pipe(iconv.decodeStream('Shift_JIS'));
            const json = await csv().fromStream(file);
            const values = json.map((obj) => Object.values(obj));
            await data[2](values);
        });
    } catch (error) {
        console.log(error);
    };
}

export const getPresignedUrlForS3Image = async (objectUrl)=>{
  if (objectUrl) {
  const imageFile = objectUrl.split('images/')[1];
  const params = { Bucket: 'traweather-bucket/images', Key: imageFile};
  const preSignedUrl =  await s3.getSignedUrlPromise('getObject', params);
  return preSignedUrl;
  }
  return objectUrl;
};

//routes
download_router.post('/csv', async (req, res) => {
    await downloadCsv(dataSets);
    res.send("csv downloaded");
});
