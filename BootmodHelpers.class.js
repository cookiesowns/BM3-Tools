const axios = require('axios');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const mkdirp = require('mkdirp');

/**
 * Class BootmodHelpers
 */
class BootmodHelpers {

  /**
   * Helper function to load file from Path
   * @param {string} filePath - filePath to load
   * @returns {Promise<string>}
   */
  static loadFromPath(filePath) {
    const resolvedPath = path.resolve(filePath);
    const readFileAsync = promisify(fs.readFile);
    return readFileAsync(resolvedPath, 'ascii')
      .then((file) => {
        return file;
      });
  }

  static async writeLogToDisk(data, filePath) {
    if (!data) {
      throw new Error('no data to write');
    }

    const parsedPath = path.parse(path.resolve(filePath));
    mkdirp.sync(parsedPath.dir);
    const writeFileAsync = promisify(fs.writeFile);
    return writeFileAsync(filePath, data);
  }

  static readJsonFromFile(filePath) {
    return this.loadFromPath(filePath)
      .then((jsonFile) => {
        return JSON.parse(jsonFile);
      });
  }

  static downloadAndSaveLog(logId, logPath) {
    const logDownloadUrl = `http://www.bootmod3.net/dlog?id=${logId}`;
    return axios.get(logDownloadUrl)
      .then((logData) => {

        if(logData.data) {
          return this.writeLogToDisk(logData.data, logPath)
        }
      });
  }
}
module.exports = BootmodHelpers;
