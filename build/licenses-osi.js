'use strict';

const fs = require('fs');
const path = require('path');
const del = require('delete');
const write = require('write');
const axios = require('axios');
const { parse } = require('node-html-parser');
const destPath = path.join(__dirname, '../lib/data/licenses-osi.json');
const srcBase = path.join(__dirname, 'vendor/licenses-osi');
const htmlPath = path.join(srcBase, 'licenses.html');

const licenses = () => {
  return del(srcBase)
    .then(() => page())
    .then(() => osi())
    .then(list => {
      return write(destPath, JSON.stringify(list, null, 2));
    });
};

function page(options = {}) {
  return axios.get('https://opensource.org/licenses/alphabetical', options)
    .then(res => {
      return write(htmlPath, res.data);
    });
}

function osi() {
  let ast = parse(fs.readFileSync(htmlPath, 'utf8'));
  let names = [];
  let ids = [];

  visit(ast, node => {
    if (node.tagName === 'a' && node.parent) {
      if (node.parent.tagName === 'li' && node.childNodes.length === 1) {
        let child = node.childNodes[0];
        let text = child.rawText.trim();
        let match = / \((.*?)\)/.exec(text);
        if (match) {
          names.push(text);
          ids.push(match[1]);
        } else if (/(v\d|version \d)/.test(text)) {
          names.push(text);
          ids.push(text);
        } else {
          return false;
        }
      }
    }
  });

  return { ids, names };
}

function visit(node, fn) {
  if (fn(node) === false) return;
  for (let child of node.childNodes) {
    child.parent = node;
    if (fn(child) === false) {
      break;
    }

    if (child.childNodes) {
      child.childNodes.forEach(n => {
        n.parent = child;
        visit(n, fn);
      });
    }
  }
}

licenses().catch(console.error);
