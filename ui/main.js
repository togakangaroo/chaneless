global.baseDir = `${__dirname}/..`

const h = require('virtual-dom/h');

const style = require('./common/style')
const messages = require('./messages')

const renderFilters = filters => h('section#filters', {}, h('h1', {}, "Filters") )
const renderInput = state => h('section#input', {}, h('h1', {}, "Input") )


const render = state =>
    h('main', { }, [
      style('main'),
      renderFilters(state.filters),
      messages(state),
      renderInput(state),
    ])

let state = require('../stubs/stubs')
const { applyQueue } = require('./rendering')
state = applyQueue(state, render)
setInterval(()=> state = applyQueue(state, render), 33)
