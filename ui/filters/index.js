const { h } = require(`${baseDir}/ui/common/dom`)
const { startAddNewFilter } = require(`${baseDir}/domain/actions/filters`)

const expandedTag = ({color, name, char}) =>
	h('section.expanded.tag', {
		style: {backgroundColor: color}
	}, [
		h('.keycode', char),
		h('.name', name)
	])

const filterSelector = ({tags}) =>
	h('aside.new-filter', {}, [
		h('h1', "Filter Selectors"),
		h('ul',
			tags.map(t =>
				h('li', expandedTag(t))
			)
		),

	])

module.exports = ({filters: { newFilter }, messages}) =>
	h('section#filters', [
		h('h1', "Filters"),
		newFilter && filterSelector(newFilter),
		h('button', {
			onclick: () => startAddNewFilter(messages)
		}, "+")
	])
