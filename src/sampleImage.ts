/**
 * gets the average color within an image, does not support crossOrigin images set img element crossOrigin to `crossOrigin=""`
 */
export function sampleImage(
  imgEl: HTMLImageElement,
): [number, number, number] {
  if (!window?.document?.createElement) {
    console.error('[color-delta-e]: sampleImage can only run in browser as it needs access to HTMLCanvas API, please check your runtime environment')
    return [0, 0, 0]
  }

  const blockSize = 5 // only visit every 5 pixels
  const defaultRGB = { r: 0, g: 0, b: 0 } // for non-supporting envs
  const canvas = document.createElement('canvas')
  const context = canvas.getContext && canvas.getContext('2d')
  let data

  let i = -4

  const rgb = { r: 0, g: 0, b: 0 }
  let count = 0

  if (!context)
    return [defaultRGB.r, defaultRGB.g, defaultRGB.b]

  const height = canvas.height
        = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
  const width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width

  context.drawImage(imgEl, 0, 0)

  try {
    data = context.getImageData(0, 0, width, height)
  }
  catch (e) {
    /* security error, img on diff domain */
    console.error(e)
    return [defaultRGB.r, defaultRGB.g, defaultRGB.b]
  }

  const length = data.data.length

  // eslint-disable-next-line no-cond-assign
  while ((i += blockSize * 4) < length) {
    ++count
    rgb.r += data.data[i]
    rgb.g += data.data[i + 1]
    rgb.b += data.data[i + 2]
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count)
  rgb.g = ~~(rgb.g / count)
  rgb.b = ~~(rgb.b / count)

  return [rgb.r, rgb.g, rgb.b]
}

