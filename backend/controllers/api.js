import fetch from 'node-fetch';
import dotenv from "dotenv";
import fs from 'fs';
import iconv from 'iconv-lite';
import csv from 'csv-parse';
dotenv.config();

export const api = {

    indicators: async (req,res) => {
        let user = process.env.kabu_plus_user;
        let password = process.env.kabu_plus_password;
        let auth = `${user}:${password}@`
        let url = `https://${auth}csvex.com/kabu.plus/csv/japan-all-stock-prices/daily/japan-all-stock-prices.csv`;
        try {
            const response = await fetch(url

            //const json = await response.json()
            //console.log(json["japan-all-stock-financial-results"][0])
            //return json["japan-all-stock-financial-results"][0]
        } catch (error) {
            console.log(error);
        }
    }
};