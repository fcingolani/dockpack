module.exports = (path, defaultModule) => {
  try {
    return require(path);
  }catch (e) {
    return defaultModule || {};
  }
}