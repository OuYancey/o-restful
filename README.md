# o-restful

> Node.js + ES6/ES7 + MongoDB

## Node.js
- restfy
- mongoose
- pm2
- axios

## crontab
```
# use for get bing daily images url
0 8 * * * node /root/o-restful/crontab/getBingImagesUrl.js  
0 20 * * * node /root/o-restful/crontab/getBingImagesUrl.js
```