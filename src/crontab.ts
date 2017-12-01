import * as cron from "cron";

import { getBingImages } from "./bingImage/bingImage.controller";

const getBingImagesInfoJob = new cron.CronJob({
    cronTime: "* * * * * *",
    onTick: () => {
        console.log("start get bing images info");
        getBingImages().then((res) => {
            // console.log(res);
            console.log("end get bing images info");
        });
    },
});

console.log(`getBingImagesInfoJob status: ${getBingImagesInfoJob.running}`);

getBingImagesInfoJob.start();

console.log(`getBingImagesInfoJob status: ${getBingImagesInfoJob.running}`);
