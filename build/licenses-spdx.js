'use strict';

const fs = require('fs');
const path = require('path');
const del = require('delete');
const write = require('write');
const clone = require('gh-clone');
const repo = opts => clone('https://github.com/spdx/license-list-data.git', opts);
const destPath = path.join(__dirname, '../lib/data/licenses-spdx.json');
const srcBase = path.join(__dirname, 'vendor/licenses-spdx');

const licenses = () => {
  return del(srcBase)
    .then(() => repo({ dest: srcBase }))
    .then(() => spdx())
    .then(list => {
      return write(destPath, JSON.stringify(list, null, 2));
    });
};

function spdx() {
  let dataPath = path.join(srcBase, 'json/licenses-spdx.json');
  let data = JSON.parse(fs.readFileSync(dataPath));
  let list = [];
  for (let item of data.licenses) {
    list.push(item.licenseId);
  }
  return list.sort();
}

licenses().catch(console.error);
