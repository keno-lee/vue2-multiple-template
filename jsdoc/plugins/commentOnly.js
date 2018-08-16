/**
 * 只处理注释 jsdoc 插件
 * @module jsdoc/plugins/commentOnly
 * @author bigfact
 */
exports.handlers = {
  beforeParse: function(e) {
    // 仅处理 scss 和 vue 文件
    if (/\.scss|vue/.test(e.filename)) {
      // 保留注释，并保留非注释行为空行
      var comments = e.source.match(/[\s\S.]*?\n/g) || []
      var isComments = false
      var commentString = ''
      comments.forEach(function(element) {
        if (/^\s*\/\*\*/.test(element)) {
          commentString += element
          isComments = true
        } else if (isComments) {
          commentString += element
          if (/\*\/\s*$/.test(element)) {
            isComments = false
          }
        } else {
          commentString += '\n'
          isComments = false
        }
      })
      e.source = commentString
    }
  }
}
