## Collection of bootmod3 tools

### log-downloader

Log downloader is a simple and straight to the point log-download/archiver solution....
It requires the following files to be setup

1) run `npm install`
2) bm3-logs.json (the json output from the `/getlogs` request) - should be raw json
3) mapFiles.json (the json output from the `/maps` request) - should be raw json output
4) run the log-downloader script via node `node log-downloader.js`

This will download all of your logs and save them into the appropriate folders under `logs`