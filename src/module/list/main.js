/**
 * 模块列表入口
 * @module src/module/list/main
 * @author bigfact
 */
require('./styles/main.scss')

let modules = getQueryString('modules').split(',')
let tpl = ''
for (let i = 0; i < modules.length; i++) {
  tpl += `
    <li>
      <a href="/${modules[i]}/">${i}. ${modules[i]}</a>
    </li>
  `
}
document.getElementById('list').innerHTML = tpl

function getQueryString(name) {
  let searchString = window.location.search
  return decodeURI(searchString.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(name).replace(/[\\.\\+\\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
}
