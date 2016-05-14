const h = require(`${baseDir}/ui/common/dom`).h;
const style = require(`${baseDir}/ui/common/style`)
const { showRelated, indicateRelated, indicateAllRelated } = require(`${baseDir}/domain/actions/relatedMessages`)
const classNames = require('classnames')

const smallIndividual = ({name, logo}) =>
	h('figure.individual.small', [
		h('img.logo', { src: logo }),
		h('caption', name),
	] )
const tagSplotch = ({color}) =>
	h('.tag-splotch', {style: {backgroundColor: color}})
const smallTags = tags =>
	h('ul.tags', tags.map(t => h('li', tagSplotch(t)) ) )

const message = m =>
	h('section', {
		onclick: () => showRelated(m),
		className: classNames({'hidden': !m.isVisible, 'unrelated': m.isUnrelated}),
		onmouseenter: () => indicateRelated(m),
		onmouseleave: () => indicateAllRelated(m),
	}, [
		smallTags(m.tags),
		smallIndividual(m),
		h('.message', m.text),
		smallTags(m.tags),
	])

module.exports = ({messages}) =>
	h('section#messages', [
		style('style'),
		style('tags'),
		h('h1', "Messages"),
		h('ul.message-list', messages.map(m =>
			h('li', message(m) )
		) )
	])
