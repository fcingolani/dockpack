const path = require('path');

const _ = require('lodash');

const tryRequire = require('./tryRequire');

module.exports = () => {

  const pjson = require( path.join(process.cwd(), 'package.json') );
  
  let dockpackConfigPath = path.join(process.cwd(), 'dockpack.config.js');
  
  return _.defaults( tryRequire(dockpackConfigPath), {
    nodeVersion: process.version.substr(1),
    experimental: false,
    squash: false,
    imageName: `${pjson.name.toLowerCase()}-dockpack:${pjson.version}`,
  });

}