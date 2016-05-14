const {enqueAction} = require(`${baseDir}/ui/rendering`)

const startAddNewFilter = () =>
	enqueAction( ({filters}) => ({
		filters: Object.assign({}, filters, {newFilter: {}} )
	}) )

module.exports = {
	startAddNewFilter,
}
