import http from 'http';
import express from 'express';
import WebSocket from 'ws';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

import fs from 'fs';
import path from 'path';
import Promise from 'promise';
import {debounce} from 'lodash';
import * as Papa from 'papaparse';
import {schema} from './gtfs/schema';
import {index} from './gtfs/indexing';
import {message, validate} from './gtfs/validation';

function parseFile(table, file) {
  return new Promise((resolve, reject) => {
    console.log('Processing '+table+'.txt');
    let content = fs.createReadStream(file);
    console.time('parsing');
    let results = Papa.parse(content, {
      header: true,
      complete: (results, file) => {
        console.timeEnd('parsing');
        console.log('Parsing '+table+'.txt complete');
        resolve(results.data);
      },
      error: (error, file) => {
        console.log('Error in parsing '+table+'.txt');
        reject();
      }
    });
  });
}

function load(directory) {
  let db = {
    errors: [],
    stats: {}
  };
  return Object.keys(schema).reduce((acc, table) => {
    let file = path.join(directory, table+'.txt');
    if(fs.existsSync(file)) {
      return acc.then(_ => parseFile(table, file).then(list => {
        db[table] = list;
        db.stats[table] = list.length;
      }));
    }
    else {
      if(!schema[table].optional) {
        db.errors.push(message('error', table+'.txt', 0, 'Required file missing'));
      }
      db[table] = [];
      return acc;
    }
  }, Promise.resolve()).then(_ => {
    validate(db, schema);
    index(db);
    return db;
  });
}

function watch(directory, fn) {
  let debounced = debounce((event, filename) => {
    fn(directory);
  }, 500);
  fn(directory);
  fs.watch(directory, {}, debounced);
}

function loadHtml() {
  return fs.readFileSync('gtfs.html', 'utf8').replace('// EXTRA_SCRIPT', 'window.GTFS_WEBSOCKET = true;');
}

function start(directory, port) {
  let data = {};
  let gtfs_html;

  if(process.env.NODE_ENV === 'production') {
    gtfs_html = loadHtml();
  }

  let app = express();
  app.use((req, res, next) => {
    if(req.url == '/') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      if(gtfs_html !== undefined) {
        res.write(gtfs_html);
      }
      else {
        res.write(loadHtml());
      }
      res.end();
    }
    else {
      next();
    }
  });

  if(process.env.NODE_ENV !== 'production') {
    // add webpack middleware to build JS
    const config = webpackConfig[0];
    config.output.path = '/';
    app.use(webpackMiddleware(webpack(config), {
      publicPath: '/dist/',
    }));
  }
  else {
    // only allow access to CSS and JS
    app.use((req, res, next) => {
      if(req.url == '/main.css' || req.url == '/dist/app.bundle.js') {
        next();
      }
      else {
        res.writeHead(404);
        res.end();
      }
    })
  }
  app.use(express.static('.'));

  const server = http.createServer(app);
  const wss = new WebSocket.Server({server});
  server.listen(port, () => console.log('Started server'))

  function broadcast() {
    wss.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  watch(directory, (directory) => {
    load(directory).then(db => {
      data = db;
      broadcast();
    });
  });

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify(data));
  });
}

let directory = process.argv[2];
let port = process.argv[3];

start(directory, port);
