import { isString } from 'yewtils'
import { isPerceivable } from './isPerceivable'
import type { ColorTuple, InputTupleTypes } from './types'
import { getType, isColorTuple } from './utils'

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
  lab: [[0, 0, 0], [0, 0, 0]],
}

const maps = {
  string: colorReturnMapsString,
  array: colorReturnMapsTuples,
}

export function contrastText(color: ColorTuple, type: InputTupleTypes): ColorTuple
export function contrastText(color: string, type?: undefined): string
export function contrastText(color: unknown, type?: InputTupleTypes): unknown {
  if (type === undefined && isColorTuple(color))
    throw new Error('No color space type passed contrastText when tuple is passed')

  type = isColorTuple(color) ? type : getType(color as any) as any

  if (!type)
    throw new Error('Could not infer color space type inside contrastText')

  const m = maps[isString(color) ? 'string' : 'array']

  return m[type as keyof typeof m][+isPerceivable(color as any, colorReturnMapsString[type][1], { type, threshold: 50 })]
}

