/**
 * @desc 文本 Helper
 * @author Jooger
 * @date 12 Aug 2017
 */

export const insertText = (text, insertionText, position) => {
  return {
    newText: `${text.slice(0, position)}${insertionText}${text.slice(position)}`,
    insertionTextLen: insertionText.length
  }
}

export const insertBefore = (text, selection, insertionText) => {
  const { newText, insertionTextLen } = insertText(text, insertionText, selection[0])
  return {
    newText,
    newSelection: selection.map(item => item + insertionTextLen)
  }
}

export const insertAfter = (text, selection, insertionText) => {
  const { newText } = insertText(text, insertionText, selection[1])
  return {
    newText,
    newSelection: [selection[0], selection[1] + insertionText.length]
  }
}

export const insertBeforeAndAfter = (text, selection, beforeInsertionText = '', afterInsertionText = '') => {
  const newAfterText = insertAfter(text, selection, afterInsertionText).newText
  const { newText, newSelection } = insertBefore(newAfterText, selection, beforeInsertionText)
  return { newText, newSelection }
}

export const insertEmptyLineBefore = (text, selection) => {
  const breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection[0])
  const beforeInsertionText = Array(breaksNeededBefore + 1).join('\n')
  if (beforeInsertionText) {
    const { newText, newSelection } = insertBefore(text, selection, beforeInsertionText)
    text = newText
    selection = newSelection
  }
  return {
    newText: text,
    newSelection: selection
  }
}

export const insertEmptyLineAfter = (text, selection) => {
  const breaksNeededAfter = getBreaksNeededForEmptyLineAfter(text, selection[1])
  const afterInsertionText = Array(breaksNeededAfter + 1).join('\n')
  if (afterInsertionText) {
    const { newText, newSelection } = insertAfter(text, selection, afterInsertionText)
    text = newText
    selection = newSelection
  }
  return {
    newText: text,
    newSelection: selection
  }
}

export function getSurroundingSelection (text, selection) {
  if (text && text.length && selection[0] === selection[1]) {
    selection = getSurroundingWordPosition(text, selection[0])
  }
  return selection
}

// 如果用户没有选中文本，则根据空格或者换行符筛选出当前区域块
function getSurroundingWordPosition (text, position) {
  // 空格或者换行符
  const isWordDelimiter = c => c === ' ' || c.charCodeAt(0) === 10

  let start = 0
  let end = text.length

  for (let i = position; i - 1 > -1; i--) {
    if (isWordDelimiter(text[i - 1])) {
      start = i
      break
    }
  }

  for (let i = position; i < text.length; i++) {
    if (isWordDelimiter(text[i])) {
      end = i
      break
    }
  }

  return [start, end]
}

function getBreaksNeededForEmptyLineBefore (text, startPosition) {
  if (startPosition === 0) {
    return 0
  }

  let neededBreaks = 2
  let isInFirstLine = true
  for (let i = startPosition - 1; i >= 0 && (neededBreaks >= 0); i--) {
    switch (text.charCodeAt(i)) {
      case 32: continue
      case 10: {
        neededBreaks--
        isInFirstLine = false
        break
      }
      default:
        return neededBreaks
    }
  }
  return isInFirstLine ? 0 : neededBreaks
}

function getBreaksNeededForEmptyLineAfter (text, startPosition) {
  if (startPosition === text.length - 1) {
    return 0
  }

  let neededBreaks = 2
  let isInLastLine = true
  for (let i = startPosition; i < text.length && (neededBreaks >= 0); i++) {
    switch (text.charCodeAt(i)) {
      case 32: continue
      case 10: {
        neededBreaks--
        isInLastLine = false
        break
      }
      default: return neededBreaks
    }
  }
  return isInLastLine ? 0 : neededBreaks
}
