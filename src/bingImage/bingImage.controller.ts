import axios, { AxiosResponse } from "axios";
import {
    BING_QUERY_API,
    GLOBAL_BING_HOST,
    MARKETS,
} from "./bingImage.constant.ts";

const basicUrl = `${GLOBAL_BING_HOST}${BING_QUERY_API}`;

interface IBingImage {
    url: string;
}

function deduplicate<T extends IBingImage>(marketImages: T[]): T[] {
    return marketImages.filter((image) => image.url.indexOf("ROW") < 0);
}

function getMarketsImages(markets: string[], n: number): Promise<IBingImage[]> {
    const promises = markets.map((market) => {
        const params = {
            format: "js",
            n,
            setmkt: market,
        };
        return axios.get(basicUrl, { params });
    });

    // TODO: Error in typescript.
    return Promise.all(promises).then((responses) => responses.map((res) => res.data.images[0]));
}

async function init() {
    const marketsImages: IBingImage[] = await getMarketsImages(MARKETS, 1);
    const images = deduplicate(marketsImages);
    // tslint:disable-next-line
    console.log(images)
}

init();
