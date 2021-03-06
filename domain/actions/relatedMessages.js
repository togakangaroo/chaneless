const {enqueAction} = require(`${baseDir}/ui/rendering`)

const tagsOverlap = ({tags}, tags2) => {
	for(let t of tags)
		if(!tags2.has(t.name))
			return false
	return true;
}

const markAllMessages = change => (target ={}) => {
	const tagsSet = new Set((target.tags||[]).map(t => t.name))
	enqueAction( ({messages}) => ({
		messages: messages.map(m => Object.assign({}, m, change(m, tagsSet) ))
	}) )
}

module.exports = {
	showRelated: markAllMessages((m, tagsSet) => ({isVisible: tagsOverlap(m, tagsSet)}) ),
	showAll: markAllMessages(() => ({isVisible: true}) ),
	indicateRelated: markAllMessages((m, tagsSet) => ({isUnrelated: !tagsOverlap(m, tagsSet)}) ),
	indicateAllRelated: markAllMessages(() => ({isUnrelated: false}) ),
}
