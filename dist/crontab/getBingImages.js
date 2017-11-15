"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const constant_1 = require("../helper/constant");
const basicUrl = `${constant_1.GLOBAL_BING_HOST}${constant_1.BING_QUERY_API}`;
function deduplicate(marketImages) {
    return marketImages.filter((image) => image.url.indexOf("ROW") < 0);
}
function getMarketsImages(markets, n) {
    const promises = markets.map((market) => {
        const params = {
            format: "js",
            n,
            setmkt: market,
        };
        return axios_1.default.get(basicUrl, { params });
    });
    return Promise.all(promises).then((responses) => responses.map((res) => res.data.images[0]));
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const marketsImages = yield getMarketsImages(constant_1.MARKETS, 1);
        const images = deduplicate(marketsImages);
        // tslint:disable-next-line
        console.log(images);
    });
}
init();
//# sourceMappingURL=getBingImages.js.map