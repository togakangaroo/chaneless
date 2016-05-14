const h = require('virtual-dom/h');
const style = require('../common/style')

const message = (m) => m.text

module.exports = ({messages}) =>
h('section#messages', {}, [
	style('style'),
	h('h1', {}, "Messages"),
	h('ul.message-list', {}, messages.map(m =>
		h('li', {}, message(m) )
	) )
])
