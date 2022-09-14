import { isArray, isString } from 'yewtils'
import type { ColorTuple, RGBColorTuple, deltaValueType } from './types'
import { getStringColorConvertion, getTupleColorConvertion } from './utils'

// cache imput colors to save calculations
const deltaCache = new Map<string, number>()

function isColorTuple(possibleColorTuple: unknown): possibleColorTuple is RGBColorTuple {
  return isArray(possibleColorTuple) && possibleColorTuple.length === 3
}

/**
 * takes two colors and measure of change in visual perception of the two given colors, returns delta-e value 0 - 100+
 *
 * more on delta-e: http://zschuessler.github.io/DeltaE/learn/
 */

export function deltaE(color1: ColorTuple, color2: string, type: Exclude<deltaValueType, 'hex'>): number
export function deltaE(color1: string, color2: ColorTuple, type: Exclude<deltaValueType, 'hex'>): number
export function deltaE(color1: ColorTuple, color2: ColorTuple, type: Exclude<deltaValueType, 'hex'>): number
export function deltaE(color1: string, color2: string, type?: Exclude<deltaValueType, 'hex'>): number
export function deltaE(color1: unknown, color2: unknown, type: unknown): number {
  if (isString(color1))
    color1 = getStringColorConvertion(color1)
  else if (isColorTuple(color1))
    color1 = getTupleColorConvertion(color1, type as Exclude<deltaValueType, 'hex'>)
  else throw new Error(`${color1} type could not be infered if is string, otherwise type has not been provided as an option if passing a tuple`)

  if (isString(color2))
    color2 = getStringColorConvertion(color2)
  else if (isColorTuple(color2))
    color1 = getTupleColorConvertion(color2, type as Exclude<deltaValueType, 'hex'>)
  else throw new Error(`${color2} type could not be infered if is string, otherwise type has not been provided as an option `)

  const value = deltaCache.get(JSON.stringify([color1, color2]))
  if (value)
    return value

  if (!isColorTuple(color1) || !isColorTuple(color2))
    throw new Error(`colors: ${color1} and ${color2} could type could not be infered or converted`)

  const labA = color1
  const labB = color2
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

