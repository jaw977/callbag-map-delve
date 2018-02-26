const test = require('tape');
const map = require('./readme');
const pipe = require('callbag-pipe');
const fromIter = require('callbag-from-iter');
const pump = require('callbag-pump');

test('Transform callbag values', t => {
  t.plan(2);
  let datas = [];
  pipe(
    fromIter([{person:{name:"Jason"}},{person:{name:"Monica"}},{}]),
    pump,
    map('person.name', 'Unknown'),
    map(name => 'Name: ' + name),
    source => source(0, (type, data) => {
      if (type === 1) datas.push(data);
      if (type === 2) {
        t.false(data);
        t.same(datas, ['Name: Jason', 'Name: Monica', 'Name: Unknown']);
      }
    }),
  );
});
