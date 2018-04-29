exports.capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const camelizeRE = /-(\w)/g
exports.camelize = (str) => {
  return exports.capitalize(str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : ''))
}

const hyphenateRE = /([^-])([A-Z])/g
exports.hyphenate = (str) => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}
