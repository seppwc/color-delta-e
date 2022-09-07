import { isString } from 'yewtils'
import { isPerceivable } from './isPerceivable'
import type { ColorTuple, deltaValueType } from './types'
import { getType } from './utils'

/**
 * returns either '#000' or '#fff' base on which contrasts better with provided color
 */

const colorReturnMapsString = {
  rgb: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
  hsl: ['hsl(0, 0%, 0%)', 'hsl(0, 100%, 100%)'],
  hex: ['#000', '#fff'],
  lab: ['#000', '#fff'],
}

const colorReturnMapsTuples = {
  rgb: [[0, 0, 0], [255, 255, 255]],
  hsl: [[0, 0, 0], [0, 100, 100]],
  hex: [[0, 0, 0], [255, 255, 255]],
  lab: [[0, 0, 0], [0, 0, 0]],
}

const maps = {
  string: colorReturnMapsString,
  array: colorReturnMapsTuples,
}

export function contrastText(color: ColorTuple, type: deltaValueType): ColorTuple
export function contrastText(color: string, type?: deltaValueType): string
export function contrastText(color: unknown, type?: deltaValueType): unknown {
  type = getType(color as any, type)

  const m = maps[isString(color) ? 'string' : 'array']

  return m[type][+isPerceivable(color as any, [255, 255, 255], { type, threshold: 50 })]
}

