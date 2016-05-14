const h = require('virtual-dom/h');
const path = require('path')
const callsite = require('callsite');

module.exports = name => {
  const stack = callsite()
  const requester = stack[1].getFileName()
  const callingDirname = path.dirname(requester)
  return h('link', {href: `${callingDirname}/${name}.css`, rel:"stylesheet"})
}
