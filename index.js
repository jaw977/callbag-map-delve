const delve = require('dlv');
const map = require('callbag-map');

const mapDelve = (transform, defaultValue) => {
  const f = typeof transform === 'string' 
    ? x => delve(x, transform, defaultValue)
    : transform;
  return map(f);
}

module.exports = mapDelve;
