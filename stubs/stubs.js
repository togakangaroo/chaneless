const people = new Map()
const createPerson = (name, logo) => people.set(name, { name, logo: `${baseDir}/stubs/${logo}` })
const selRand = (...arr) => arr[Math.floor(Math.random()*arr.length)]

const p = (name, msg) => {
	if(!people.has(name))
		createPerson(name, selRand('grad.png', 'koala.jpg', 'superhappy.png'))
	return Object.assign({}, msg, people.get(name))
}
const m = (text, ...tags) => ({ text, tags })

module.exports = {
	messages: [
		p("George", m("Boooring", 'gchat', 'gmauer', 'Laura' )),
		p("Fred", m("Hey guys", 'general', 'slack', 'nola' )),
		p("Phil", m("Whats up Fred?", 'general', 'slack', 'nola' )),
		p("Bill", m("Anyone want to go camping?", 'camping', 'discord' )),
		p("Fred", m("Man, I'm having a hard day", 'general', 'slack', 'nola' )),
		p("Jen", m("Don't go to black bear, I got eaten by a bear last week. Had to fight my way out.", 'camping', 'discord' )),
	]
}
