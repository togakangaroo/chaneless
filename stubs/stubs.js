const people = new Map()
const createPerson = (name, logo) => people.set(name, { name, logo: `${baseDir}/stubs/${logo}` })
const tags = new Map()
const randomColor = require('randomcolor')
const colors = randomColor({count: 36})[Symbol.iterator]()
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"[Symbol.iterator]()

const getTag = name => {
	if(tags.has(name))
		return tags.get(name)
	const {value: color, done} = colors.next()
	const {value: char } = letters.next()
	if(done) throw Error("Too many tags, not enough colors!")
	tags.set(name, {name, color, char})
	return getTag(name)
}

const selRand = (...arr) => arr[Math.floor(Math.random()*arr.length)]

const p = (name, msg) => {
	if(!people.has(name))
		createPerson(name, selRand('grad.png', 'koala.jpg', 'superhappy.png'))
	return Object.assign({
		isVisible: true,
		isUnrelated: false,
	}, msg, people.get(name))
}
const m = (text, ...tags) => ({ text, tags: tags.map(getTag) })

module.exports = {
	filters: {},
	messages: [
		p("George", m("Boooring", 'gchat', 'gmauer', 'Laura' )),
		p("Daria", m("Coding tonight, I'm pretty good at it no big deal", 'hackathon', 'nola', 'slack' )),
		p("Fred", m("Hey guys", 'general', 'slack', 'nola' )),
		p("Phil", m("Whats up Fred?", 'general', 'slack', 'nola' )),
		p("Bill", m("Anyone want to go camping?", 'camping', 'discord' )),
		p("Fred", m("Man, I'm having a hard day", 'general', 'slack', 'nola' )),
		p("Jen", m("Don't go to black bear, I got eaten by a bear last week. Had to fight my way out.", 'camping', 'discord' )),
		p("Denis", m("might be eaten by a black bear at this hackathon as well", 'hackathon', 'nola', 'slack' )),
	],
}
