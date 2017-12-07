/**
 * 保存二进制数据至本地
 *
 * @param {Blob} blob - 二进制数据，由 new Blob() 生成
 * @param {string} filename - 保存的文件名称
 */
function download(blob, filename) {
    console.log(blob);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
}

/**
 * 下载 **ts** 分段保存的视频文件
 *
 * @param {string} basicUrl - 除去末尾 stream_*.ts 部分的基本 url
 * @param {string} filename - 保存的文件名称
 * @param {number} start    - stream 片段的开始
 * @param {number} end      - stream 片段的结束
 */
function downloadVideo(basicUrl, filename, start, end) {
    let count = end - start
    const streams = []

    for (let i = start; i < end; i++) {
        let streamUrl = `${basicUrl}/stream_${i}.ts`

        streams.push(new Promise((resolve, reject) => {
            fetch(streamUrl)
                .then(res => {
                    console.log(`stream_${i}\tok!\tremain ${--count}`)
                    return res.blob()
                })
                .then(blob => resolve(blob))
                .catch(err => reject(err))
        }))
    }

    Promise.all(streams)
        .then(results => download(new Blob(results), filename))
        .catch(err => console.log(err))
}

function downloadStreams(basicUrl, streams, filename) {
    const promises = [];
    streams.forEach(stream => {
        console.log(stream, `${basicUrl}/${stream.uri}`);
        promises.push(new Promise((resolve, reject) => {
            fetch(`${basicUrl}/${stream.uri}`)
                .then(res => res.blob())
                .then(blob => {
                    console.log(blob)
                    return resolve(blob)
                })
                .catch(err => reject(err))
        }))
    })

    Promise.all(promises)
        .then(results => download(new Blob(results), filename))
        .catch(err => console.log(err))
}

function parseM3U8(m3u8Text) {
    let totalDuration = 0;
    const streams = [];

    const lines = m3u8Text.trim().split('\n');
    lines.forEach((line, index) => {
        const match = (/^#EXTINF:?([0-9\.]*)?,?(.*)?$/).exec(line.trim());
        if (!match) return;

        const duration = parseFloat(match[1]);
        totalDuration += duration;
        streams.push({
            uri: lines[index + 1].trim(),
            duration
        });
    });

    return {
        m3u8: m3u8Text,
        streams,
        totalDuration
    }
}

function parseURL(m3u8URL) {
    const query = m3u8URL.indexOf('?');
    const pathname = query > -1 ? m3u8URL.substring(0, query) : m3u8URL;
    const matches = pathname.match(/\/([^\/?#]+)$/i);

    return {
        pathname,
        baseURL: pathname.replace(matches[0], ''),
        filename: matches[1]
    }
}

function downloadM3U8(url, start, end) {
    start = start || 0;
    end = end || Infinity;

    const URLInfo = parseURL(url);

    fetch(url).then(response => response.text()).then(data => {
        const m3u8 = parseM3U8(data);
        const streams = m3u8.streams.filter((stream, index) => (index >= start - 1 && index <= end - 1) ? stream : null);

        console.log(streams);

        downloadStreams(URLInfo.baseURL, streams, URLInfo.filename);
    })
}
