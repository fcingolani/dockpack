const os = require('os');
const { spawn, execSync } = require('child_process');

const kill = require('tree-kill');



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
      resolve(code === 0);
    });
  });
  
}