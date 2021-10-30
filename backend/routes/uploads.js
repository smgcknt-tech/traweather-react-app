import multer from 'multer';
import express from 'express';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { env } from '../configs/config.js';
export const upload_router = express.Router();

aws.config.update({
    accessKeyId: env.AWSAccessKeyIdForS3,
    secretAccessKey: env.AWSSecretKeyForS3,
});

//file-upload to S3
const s3 = new aws.S3();
const storageS3 = multerS3({
    s3,
    bucket: 'traweather-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const uploadS3 = multer({ storage: storageS3 });

//file-upload to uploads folder

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

//upoload_router

upload_router.post('/s3', uploadS3.single('image'), (req, res) => {
    res.send(req.file.location);
});
upload_router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});