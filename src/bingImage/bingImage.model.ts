import * as mongoose from "mongoose";

export type BingImageModel = mongoose.Document & {
    url: string,
    urlbase: string,
    name: string,
    copyright: string,
    market: string,
    startdate: string,
    fullstartdate: string,
};

const bingImageSchema = new mongoose.Schema({
    url: String,
    urlbase: String,
    name: String,
    copyright: String,
    market: String,
    startdate: String,
    fullstartdate: String,
});

const BingImage = mongoose.model("BingImage", bingImageSchema);

export default BingImage;
