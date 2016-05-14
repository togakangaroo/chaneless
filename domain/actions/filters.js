const {enqueAction} = require(`${baseDir}/ui/rendering`)


const startAddNewFilter = messages => {
	const tags = [ ...messages.reduce((s, m) => (m.tags.forEach(t => s.add(t)), s), new Set()) ]
	enqueAction( ({filters}) => ({
		filters: Object.assign({}, filters, {newFilter: {
			tags: tags.map(t => Object.assign({}, t, {isSelected: false}) )
		}} )
	}) )
}
module.exports = {
	startAddNewFilter,
}
