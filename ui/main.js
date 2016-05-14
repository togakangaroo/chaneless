const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

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

const stubs = require('../stubs/stubs')
const tree = render(stubs);
const rootNode = createElement(tree);
document.body.querySelector('.application').appendChild(rootNode);
