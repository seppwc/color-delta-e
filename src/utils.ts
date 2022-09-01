import type { ColorTuple } from './types'

/**
 * convert Hex string to RGB ColorTuple
 */
export function hexToRGBTuple(h: string): [number, number, number] {
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
type LABColor = ColorTuple

/**
   * convert RGB ColorTuple to LAB ColorType
   */
export function convertRGBToLAB(rgb: ColorTuple): LABColor {
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
 * converts a ColorTuple to rgb string e.g `rgb(0,0,0)`
 */
export function toRBGString([r, g, b]: ColorTuple) {
  return `rgb(${r},${g},${b})`
}

/**
   * converts a ColorTuple to hsl string e.g `hsl(0,0,0)`
   */
export function toHSLString([h, s, l]: ColorTuple) {
  return `hsl(${h},${s},${l})`
}
