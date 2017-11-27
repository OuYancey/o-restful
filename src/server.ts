import * as Koa from "koa";
import * as logger from "koa-logger";

const app = new Koa();
app.use(logger());

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
});

app.use(async (ctx) => {
    ctx.body = "O's restful api test";
});

app.listen(2017);
