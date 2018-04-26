const { spawn } = require('child_process');

module.exports = async (args) => {

  return new Promise((resolve, reject) => {
    const cmd = spawn('docker', args, {
      cwd: process.cwd()
    });
  
    cmd.stdout.on('data', (data) => {
      process.stdout.write(`${data}`);
    });
  
    cmd.stderr.on('data', (data) => {
      process.stderr.write(`${data}`);
    });
  
    cmd.on('close', (code, signal) => {
      if(code === 0){
        resolve(code)
      }else{
        reject(code)
      }
    });
  });
  
}