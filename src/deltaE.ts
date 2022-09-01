import type { ColorTuple, deltaValueType } from './types'
import { convertRGBToLAB } from './utils'

// cache imput colors to save calculations
const deltaCache = new Map<string, number>()

/**
 * takes two colors and measure of change in visual perception of the two given colors, returns delta-e value 0 - 100+
 *
 * more on delta-e: http://zschuessler.github.io/DeltaE/learn/
 */
export function deltaE(color1: ColorTuple, color2: ColorTuple, type: deltaValueType = 'rgb') {
  if (!type) {
    //
  }

  const value = deltaCache.get(JSON.stringify([color1, color2]))
  if (value)
    return value

  const labA = convertRGBToLAB(color1)
  const labB = convertRGBToLAB(color2)
  const deltaL = labA[0] - labB[0]
  const deltaA = labA[1] - labB[1]
  const deltaB = labA[2] - labB[2]
  const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2])
  const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2])
  const deltaC = c1 - c2
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH)
  const sc = 1.0 + 0.045 * c1
  const sh = 1.0 + 0.015 * c1
  const deltaLKlsl = deltaL / 1.0
  const deltaCkcsc = deltaC / sc
  const deltaHkhsh = deltaH / sh
  const i
      = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh

  const result = i < 0 ? 0 : Math.sqrt(i)

  deltaCache.set(JSON.stringify([color1, color2]), result)

  return result
}
