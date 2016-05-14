const h = require(`${baseDir}/ui/common/dom`).h;
const style = require(`${baseDir}/ui/common/style`)

const smallIndividual = ({name, logo}) =>
	h('figure.individual.small', [
		h('img.logo', { src: logo }),
		h('caption', name),
	] )

const message = m =>
	h('section', [
		smallIndividual(m),
		h('.message', m.text),
	])

module.exports = ({messages}) =>
h('section#messages', [
	style('style'),
	h('h1', "Messages"),
	h('ul.message-list', messages.map(m =>
		h('li', message(m) )
	) )
])
