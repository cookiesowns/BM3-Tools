const _ = require('lodash');
const bootmod3 = require('./BootmodHelpers.class');
const jsonPath = './bm3-logs.json';
const mapPath = './mapFiles.json';

const run = async () => {
  const mapFiles = {};
  const logs = await bootmod3.readJsonFromFile(jsonPath);
  const mapNames = await bootmod3.readJsonFromFile(mapPath);

  mapNames.forEach(({id, name}) => {
    mapFiles[id] = {id, name};
  });

  const determineLogPath = (id, name, mapId) => {
    const mapName = _.get(mapFiles, `${mapId}.name`, null);

    if (!mapName || mapName === null) {
      return (name) ? `${name}.csv` : `${id}.csv`;
    }

    return (name) ? `${mapName}/${name}.csv` : `${mapName}/${id}.csv`
  };

  const processLogs = logs.map(({id, name, mapId}) => {
    if(!id && !name) {
      throw new Error(`Invalid Log: ${id}`)
    }

    const logPath = `logs/${determineLogPath(id, name, mapId)}`;

    if(!logPath) {
      return false;
    }

    return bootmod3.downloadAndSaveLog(id, logPath);
  });

  Promise.all(processLogs).then(() => {
    return 'SUCCESS';
  })
};


run().then((status) => {
    console.log(status);
  }).catch((err) => {
    console.log(err);
});
