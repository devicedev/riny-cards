export const calcCardStyle = (length, scale, maxSize = 2.5, maxHeight = 4) => {
  let amount = 0
  if (length >= scale) {
    while (length > 0 && amount < 6) {
      length -= scale
      amount++
    }
  } else {
    while (length < scale && amount > -6) {
      length += scale
      amount--
    }
  }
  let fontSize = maxSize - amount * .4
  fontSize = fontSize > maxSize ? maxSize : fontSize
  let lineHeight = maxHeight - amount * .4
  lineHeight = lineHeight > maxHeight ? maxHeight : lineHeight

  return {
    fontSize: `${fontSize}rem`,
    lineHeight: `${lineHeight}rem`
  }
}