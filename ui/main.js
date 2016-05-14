global.baseDir = `${__dirname}/..`

const { runGimgen, timeoutSignal } = require('gimgen/dist/gimgen')

const style = require('./common/style')
const messages = require('./messages')

const h = require('virtual-dom/h');
const renderFilters = filters => h('section#filters', {}, h('h1', {}, "Filters") )
const renderInput = state => h('section#input', {}, h('h1', {}, "Input") )

const render = state =>
    h('main', { }, [
      style('main'),
      renderFilters(state.filters),
      messages(state),
      renderInput(state),
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
