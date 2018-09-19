exports.getGitUser = require('./git-user')

exports.getDate = require('./get-date')

exports.confirm = require('./confirm')

exports.capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

exports.hyphenate = str=> {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}
