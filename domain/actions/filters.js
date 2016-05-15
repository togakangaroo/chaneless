const {enqueAction} = require(`${baseDir}/ui/rendering`)

const letters = /[A-Z]|\d/
const parseSelected = (val, tags) =>  {
	const tagChars = new Set(val.toUpperCase().split('').filter(c => letters.test(c)))
	return t => tagChars.has(t.char)
}

const filtersFrom = (tags, change) => ({filters}) => ({
	filters: Object.assign({}, filters, {newFilter: {
		tags: tags.map(t => Object.assign({}, t, change(t)) )
	}} )
})

const startAddNewFilter = messages => {
	const tags = [ ...messages.reduce((s, m) => (m.tags.forEach(t => s.add(t)), s), new Set()) ]
	enqueAction(filtersFrom(tags, () => ({isSelected: false})) )
}
const configureNewFilter = (val, tags) => {
	const isSelected = parseSelected(val, tags)
	enqueAction(filtersFrom(tags, (t) => ({isSelected: isSelected(t)})) )
}

module.exports = {
	startAddNewFilter, configureNewFilter,
}
