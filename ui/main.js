global.baseDir = `${__dirname}/..`

const { runGimgen, timeoutSignal } = require('gimgen/dist/gimgen')

const style = require('./common/style')
const messages = require('./messages')
const filters = require('./filters')

const { h } = require('./common/dom');
const input = state => h('section#input', [
  h('input', {placeholder: "Your message"}),
  h('button', "Post"),
])

const render = state =>
    h('main', { }, [
      style('main'),
      filters(state),
      messages(state),
      input(state),
    ])

const stubs = require('../stubs/stubs')
const { applyQueue } = require('./rendering')
runGimgen(function * renderLoop() {
    let state = stubs
    let fps60Signal = timeoutSignal(1000/60)
    while(true) {
      state = applyQueue(state, render)
      yield fps60Signal
  }
})

const { showAll } = require(`${baseDir}/domain/actions/relatedMessages`)
document.addEventListener('keydown', e => e.code === 'Escape' && showAll() )
