# dockpack

Run your webpack builds inside a docker container

## About

I got tired of incompatibility issues between my installed node version, node-sass, webpack and its plugins, and the lack of python or gcc to compile binary dependencies. So I created this Q&D tool which runs webpack inside a docker container so I don't have to care about those issues. I'm using it in 2 projects and haven't found any issues. YMMV probably and I'm sure there's a lot of things that could be done better.

Your project's directory is shared to the container as a volume. NPM packages are installed inside the container and this `node_modules` is mounted over your host's `node_modules` directory using a bind mount, so the npm install that is automatically executed inside the container won't overwrite your locally installed packages.

Was a fun and fast little project that grew out of my frustration. :)

## Installation

```
npm install -g dockpack
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
