const _ = require('lodash');

const spawnDockerCmd = require('./spawnDockerCmd');

module.exports = async (dockpackConfig) => {

  const startedAt = (+ new Date);
  const containerName = `dockpack-${startedAt}`;

  let args = [
    'run',
    '-i',
    '-v', `${process.cwd()}:/app/src`,
    '--name', containerName,
    '--rm'
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

  async function onSigInt() {
    await spawnDockerCmd(['rm', '-f', containerName]);
    process.exit();
  }

  process.prependListener("SIGINT", onSigInt);

  let code = await spawnDockerCmd(args);

  process.removeListener("SIGINT", onSigInt);

  return code;

}