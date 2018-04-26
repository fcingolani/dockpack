const fs = require('fs');

const tmp = require('tmp');
const _ = require('lodash');

const tpl = _.template(`
  FROM node:<%= nodeVersion %>

  WORKDIR /app/src

  RUN npm install -g webpack@<%= webpackVersion %>

  RUN echo '#!/bin/bash\\n\
  test ! -d /app/src/node_modules && mkdir -p /app/src/node_modules\\n\
  mount --bind /app/packages/node_modules /app/src/node_modules\\n\
  exec "$@"\\n' >> /app/entrypoint.sh \
      && chmod +x /app/entrypoint.sh

  COPY ./package.json ./npm-shrinkwrap.json /app/packages/

  RUN cd /app/packages \
      && npm install -d --no-save

  ENTRYPOINT ["/app/entrypoint.sh"]
  CMD ["webpack"]
`);

module.exports = async (dockpackConfig) => {
  return new Promise((resolve, reject) => {

    tmp.file((err, path, fd, cleanupCallback) => {
      if(err) {
        reject(err);
      }else{
        fs.writeSync(fd, tpl(dockpackConfig));
        resolve({
          path,
          fd,
          remove: cleanupCallback
        });
      }
    })

  });
}