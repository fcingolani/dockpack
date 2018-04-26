const _ = require('lodash');

const spawnDockerCmd = require('./spawnDockerCmd');

module.exports = async (dockpackConfig) => {

  let args = [
    'run',
    '-v', `${process.cwd()}:/app/src`
  ];

  _.each(dockpackConfig.dockerVolumes, (v) => {
    args.push('-v');
    args.push(v);
  });
  
  args = args.concat([
    '--cap-add', 'SYS_ADMIN',
    dockpackConfig.imageName,
    'webpack',
  ]);

  args = args.concat(process.argv.slice(2));

  if(args.indexOf('--watch') !== -1 && args.indexOf('--watch-poll') === -1){
    args.push('--watch-poll');
  }

  let code = await spawnDockerCmd(args);

  return code;

}