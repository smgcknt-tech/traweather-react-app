import multer from 'multer';
import express from 'express';
import { validation_token } from '../configs/JWT.js';

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

uploadRouter.post('/',upload.single('image'), (req, res) => {
    console.log(req.file.path)
    res.send(`/${req.file.path}`);
});
