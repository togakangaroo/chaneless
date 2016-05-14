const { h } = require(`${baseDir}/ui/common/dom`)
const { startAddNewFilter } = require(`${baseDir}/domain/actions/filters`)

const expandedTag = ({color, name, char}) =>
	h('section.expanded.tag', {
		style: {backgroundColor: color}
	}, [
		h('.keycode', char),
		h('.name', name)
	])

const tagsFor = messages =>
	[ ...messages.reduce((s, m) => (m.tags.forEach(t => s.add(t)), s), new Set()) ]
const filterSelector = ({messages}) =>
	h('aside.new-filter', {}, [
		h('h1', "Filter Selectors"),
		h('ul',
			tagsFor(messages).map(t =>
				h('li', expandedTag(t))
			)
		),

	])

module.exports = ({filters: { newFilter }, messages}) =>
	h('section#filters', [
		h('h1', "Filters"),
		newFilter && filterSelector({newFilter, messages}),
		h('button', {
			onclick: startAddNewFilter
		}, "+")
	])
