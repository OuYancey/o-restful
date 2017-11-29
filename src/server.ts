import * as Koa from "koa";
import * as logger from "koa-logger";

import bingImageRouter from "./bingImage/bingImage.router";

const app = new Koa();

app.use(logger());
app.use(bingImageRouter.routes());

app.listen(2017);
