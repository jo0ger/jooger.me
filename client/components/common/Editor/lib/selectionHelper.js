/**
 * @desc 元素的Selection Helper
 * @author Jooger
 * @date 12 Aug 2017
 */

const checkNode = node => {
  if (!node || node.nodeType !== 1) {
    throw new Error('节点不是DOM节点')
  }
}

export const getSelection = node => {
  checkNode(node)
  return [node.selectionStart, node.selectionEnd]
}

export const setSelection = (node, start, end) => {
  checkNode(node)
  if (!node.setSelectionRange) {
    throw new Error('当前浏览器不支持HTMLInputElement.setSelectionRange方法')
  }
  node.setSelectionRange(start, end)
}
