const {VNode, VText} = require('virtual-dom')
const el = require('virtual-dom/h')

const isObject = o => 'object' === typeof(o) && !Array.isArray(o) && !(o instanceof VNode) && !(o instanceof VText)
const	h = (arg1, arg2, arg3, ...others) =>
		'string' !== typeof(arg1) ?
			h('div', arg1, arg2, arg3, ...others) :
		!isObject(arg2) ?
			h(arg1, {}, arg2, arg3, ...others) :
		!Array.isArray(arg3) ?
			h(arg1, arg2, [arg3].concat(others)) :
			el(arg1, arg2, arg3)

module.exports = { h }
