# Crontab

Get bing images info by crontab.

## Command

```bash
crontab -e
```

then, add new crontab tasks.

```
# use for get bing daily images url
0 8 * * * node [path]/o-restful/dist/crontab/getBingImagesUrl.js
0 20 * * * node [path]/o-restful/dist/crontab/getBingImagesUrl.js
```
