const {enqueAction} = require(`${baseDir}/ui/rendering`)

const tagsOverlap = ({tags}, tags2) => {
	for(let t of tags)
		if(tags2.has(t.name))
			return true;
	return false;
}

module.exports = target => {
	const tagsSet = new Set(target.tags.map(t => t.name))
	enqueAction( ({messages}) => ({
		messages: messages.map(m => Object.assign({}, m, {isVisible: tagsOverlap(m, tagsSet)} ))
	}) )
}
