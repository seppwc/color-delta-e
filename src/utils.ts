import type { ColorTuple, RGBColorTuple, deltaValueType } from './types'

/**
 * convert Hex string to RGB RGBColorTuple
 */
export function convertHexToTuple(h: string): [number, number, number] {
  let r: any = 0
  let g: any = 0
  let b: any = 0

  // 3 digits
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`
    g = `0x${h[2]}${h[2]}`
    b = `0x${h[3]}${h[3]}`

    // 6 digits
  }
  else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`
    g = `0x${h[3]}${h[4]}`
    b = `0x${h[5]}${h[6]}`
  }

  return [parseInt(r), parseInt(g), parseInt(b)]
}

/**
 * LAB colorspace represented by tuple
 */
type LABColor = RGBColorTuple

/**
   * convert RGB RGBColorTuple to LAB ColorType
   */
export function convertRGBToLAB(rgb: RGBColorTuple): LABColor {
  let r = rgb[0] / 255
  let g = rgb[1] / 255
  let b = rgb[2] / 255
  let x: number
  let y: number
  let z: number
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
}

/**
 * converts a RGBColorTuple to rgb string e.g `rgb(0,0,0)`
 */
export function toRBGString([r, g, b]: RGBColorTuple) {
  return `rgb(${r},${g},${b})`
}

/**
   * converts a RGBColorTuple to hsl string e.g `hsl(0,0,0)`
   */
export function toHSLString([h, s, l]: RGBColorTuple) {
  return `hsl(${h},${s},${l})`
}

type StringConversionFunction = (color: string) => RGBColorTuple
type TupleConversionFunction = (color: [number, number, number]) => LABColor

const convertStringToTuple = (color: string): RGBColorTuple => {
  const r = color.match(/\d+/g)

  if (!r)
    return [0, 0, 0]

  return r as unknown as RGBColorTuple
}

const convertHSLtoTuple = (color: string): RGBColorTuple => {
  let [h, s, l] = convertStringToTuple(color)

  s /= 100
  l /= 100

  // Strip label and convert to degrees (if necessary)
  if (color.includes('rad'))
    h = Math.round(h * (180 / Math.PI))

  else if (color.includes('turn'))
    h = Math.round(h * 360)

  if (h >= 360)
    h %= 360

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  }
  else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  }
  else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  }
  else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  }
  else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  }
  else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return [r, g, b]
}

const stringConverstionMap: Record<deltaValueType, StringConversionFunction> = {
  rgb: convertStringToTuple,
  hex: convertHexToTuple,
  hsl: convertHSLtoTuple,
  lab: convertStringToTuple,
}

const tupleConverstionMap: Record<Exclude<deltaValueType, 'hex'>, TupleConversionFunction > = {
  rgb: color => convertRGBToLAB(color),
  hsl: color => stringConverstionMap.hsl(toHSLString(color)),
  lab: color => color,
}

export function getType(color: string): deltaValueType {
  if (color.slice(0, 3).includes('rgb'))
    return 'rgb'

  if (color.slice(0, 3).includes('hsl'))
    return 'hsl'

  if (color.slice(0, 3).includes('#'))
    return 'hex'

  if (color.slice(0, 3).includes('lab'))
    return 'lab'

  return 'rgb'
}

export function getStringColorConvertion(color: string) {
  const type = getType(color)

  const rgbTuple = stringConverstionMap[type](color)

  return getTupleColorConvertion(rgbTuple, 'rgb')
}

export function getTupleColorConvertion(color: ColorTuple, type: Exclude<deltaValueType, 'hex'>) {
  return tupleConverstionMap[type](color)
}
