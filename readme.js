/**
 * callbag-map-delve
 * -----------------
 *
 * Callbag operator that applies a transformation on data passing through it.
 * Works on either pullable or listenable sources.
 *
 * The transformation may be a string containing a dot-notated path to get
 * in a (nested) object.  A default value may be passed to use if the full 
 * path does not exist or the value is undefined. (see the `dlv` module).
 *
 * Otherwise, the transformation is a function and works exactly like callbag-map.
 *
 * `npm install callbag-map-delve`
 *
 * Example:
 *
 * const { pipe, fromIter, forEach } = require('callbag-basics');
 * const map = require('callbag-map-delve');
 * pipe(
 *   fromIter([ {person:{name:"Jason"}}, 
 *              {person:{name:"Monica"}}, 
 *              {} ]),
 *   map("person.name", "Unknown"),
 *   map(name => "Name: " + name),
 *   forEach(x => console.log(x))  // Name: Jason
 *                                 // Name: Monica
 *                                 // Name: Unknown
 * );
 */

const delve = require('dlv');
const map = require('callbag-map');

const mapDelve = (transform, defaultValue) => {
  const f = typeof transform === 'string' 
    ? x => delve(x, transform, defaultValue)
    : transform;
  return map(f);
}

module.exports = mapDelve;
