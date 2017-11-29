import * as KoaRouter from "koa-router";

const router = new KoaRouter();

router.get("/api/bing-image", async (ctx) => {
    try {
        const movies = [
            { a: "a" },
        ];
        ctx.body = {
            status: "success",
            data: movies,
        };
    } catch (err) {
        // console.warn(err);
    }
});

export default router;
