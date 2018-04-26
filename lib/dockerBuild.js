const createTemporaryDockerfile = require('./createTemporaryDockerfile');
const spawnDockerCmd = require('./spawnDockerCmd');

module.exports = async (dockpackConfig) => {

  let temporaryDockerFile = await createTemporaryDockerfile(dockpackConfig);

  let args = [
    'build',
    '--compress'
  ];
  
  args.push(`-t`);
  args.push(dockpackConfig.imageName);
  args.push('-f')
  args.push(temporaryDockerFile.path);
  args.push('.');
  
  if(dockpackConfig.experimental && dockpackConfig.squash){
    args.push('--squash');
  }

  let code = await spawnDockerCmd(args);
  
  temporaryDockerFile.remove();

  return code;

}