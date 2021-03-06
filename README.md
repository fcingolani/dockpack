# dockpack

Run your webpack builds inside a docker container

## About

I got tired of incompatibility issues between my installed node version, node-sass, webpack and its plugins, and the lack of python or gcc to compile binary dependencies. So I created this Q&D tool which runs webpack inside a docker container so I don't have to care about those issues. I'm using it in 2 projects and haven't found any issues. YMMV probably and I'm sure there's a lot of things that could be done better.

I'm not currently using webpack dev server on those projects, so I haven't tested it. Won't probably work, I guess I should add an `EXPOSE something` to the Dockerfile. If you want to modify it and try it, be my guest.

Your project's directory is shared to the container as a volume. NPM packages are installed inside the container and this `node_modules` is mounted over your host's `node_modules` directory using a bind mount, so the npm install that is automatically executed inside the container won't overwrite your locally installed packages.

Was a fun and fast little project that grew out of my frustration. :)

## Installation

```
npm install -g dockpack
```

## Configuration

You can create a `dockpack.config.js` on your project's root directory but it's not really necessary unless you want to customize something:

```js
module.exports = {

  // Choose a custom node version.
  // By default it will use the same version that your host has.
  nodeVersion: '6',
  
  // An array of custom volumes
  dockerVolumes: [ 
    `${__dirname}/../other/path/:/app/src/sabarasaba`
  ],
  
  // If these are set to true, your image will be squashed.
  // Currently supported on the experimental Docker daemon.
  experimental: true,
  squash: true
}
```

## Usage

It's a wrapper around webpack cli, so call it like you would do it with webpack:

```
dockpack
```

or

```
dockpack --watch
```
