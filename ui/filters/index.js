const { h } = require(`${baseDir}/ui/common/dom`)
const classNames = require('classnames')
const { startAddNewFilter, configureNewFilter } = require(`${baseDir}/domain/actions/filters`)
const style = require(`${baseDir}/ui/common/style`)

const expandedTag = ({color, name, char, isSelected}) =>
	h('section.expanded.tag', {
		className: classNames({'selected': isSelected}),
		style: {backgroundColor: color,},
	}, [
		h('.keycode', char),
		h('.name', name)
	])

const filterSelector = ({tags}) =>
	h('aside.filter-builder', {}, [
		h('h1', "Filter Selectors"),
		h('ul',
			tags.map(t =>
				h('li', expandedTag(t))
			)
		),
		h('.input-filter', [
			h('input', {
				onkeyup: e => configureNewFilter(e.target.value, tags)
			}),
		])
	])

module.exports = ({filters: { newFilter }, messages}) =>
	h('section#filters', [
		style('style'),
		h('h1', "Filters"),
		newFilter && filterSelector(newFilter),
		h('button', {
			onclick: () => startAddNewFilter(messages)
		}, "+")
	])
