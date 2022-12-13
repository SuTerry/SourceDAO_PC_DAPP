import moment from 'moment'

export const truncateMiddle = (
  str: string,
  frontLen = 4,
  backLen = 4,
  truncateStr = '…',
): string => {
  if (str === null) {
    return ''
  }

  const strLen = str.length
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
  }
}

export const randomID = (n = 18, radix = 36): string => {
  const idString = (
    Number(Math.random() * Math.pow(10, n)) + Date.now()
  ).toString(radix)
  return idString
}

export const randomExamId = (): string => {
  const random = randomID()
  return new Date().getTime() + random
}

export const utf8ArrayToStr = (array: Uint8Array): string => {
  const len = array.length
  let out, i, c, char2, char3

  out = ''

  i = 0
  while (i < len) {
    c = array[i++]
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        out += String.fromCharCode(c)
        break
      case 12: case 13:
        char2 = array[i++]
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
        break
      case 14:
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0))
        break
    }
  }

  return out
}

export const dateTimeConversion = (value: number, type = 'YYYY-MM-DD'): string => {
  if (!value) return ''
  return moment(value).format(type)
}

export const scoreGrade = (score: number): string => {
  if (!score) return 'Fail'
  return score > 59
    ? score > 69
      ? score > 79
        ? score > 89
          ? 'High Distinction'
          : 'Distinction'
        : 'Credit'
      : 'Pass'
    : 'Fail'
}