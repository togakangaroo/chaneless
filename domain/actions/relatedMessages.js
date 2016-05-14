const {enqueAction} = require(`${baseDir}/ui/rendering`)

const tagsOverlap = ({tags}, tags2) => {
	for(let t of tags)
		if(tags2.has(t.name))
			return true;
	return false;
}

const markRelatedAs = change => target => {
	const tagsSet = new Set(target.tags.map(t => t.name))
	enqueAction( ({messages}) => ({
		messages: messages.map(m => Object.assign({}, m, change(m, tagsSet) ))
	}) )
}

module.exports = {
	showRelated: markRelatedAs((m, tagsSet) => ({isVisible: tagsOverlap(m, tagsSet)}) ),
	indicateRelated: markRelatedAs((m, tagsSet) => ({isUnrelated: !tagsOverlap(m, tagsSet)}) ),
	indicateAllRelated: markRelatedAs(() => ({isUnrelated: false}) ),
}
