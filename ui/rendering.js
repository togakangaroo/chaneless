const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

let queue = new Set()
let rootNode = null
let tree = null

const ensureInitialized = (state, render) => {
	if(null !== rootNode) return
	tree = render(state)
	rootNode = createElement(tree);
	document.body.querySelector('.application').appendChild(rootNode);
}

const applyQueue = (state, render) => {
	ensureInitialized(state, render)

	const newState = [...queue].reduce((s, act) => Object.assign({}, s, act(s)), state )
	queue = new Set()

	const newTree = render(newState)
	const patches = diff(tree, newTree)
	rootNode = patch(rootNode, patches)
	tree = newTree
	return newState
}
const enqueAction = thunk => queue.add(thunk)

module.exports = {
	enqueAction, applyQueue
}
