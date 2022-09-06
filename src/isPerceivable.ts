import { isArray, isString } from 'yewtils'
import { deltaE } from './deltaE'
import type { ColorTuple, deltaValueType } from './types'

/**
 * checks if `first` would be noticebly different to the naked eye to `second`
 * returns true if they contrast enough,
 * threshold can be modified by `0 - 100` `(default = 5)`, to change how much difference the colors need to be
 */

export function isPerceivable(first: ColorTuple, second: ColorTuple, threshold: number, type: deltaValueType): boolean
export function isPerceivable(first: string, second: string, threshold: number, type: undefined): boolean
export function isPerceivable(first: unknown, second: unknown, threshold: number, type: unknown): boolean {
  threshold = threshold || 5
  type = type || undefined

  if (!isArray(first) && !isArray(second) && isString(first) && isString(second))
    return Math.round(deltaE(first, second)) > threshold

  return Math.round(deltaE(first as ColorTuple, second as ColorTuple, type as deltaValueType)) > threshold
}
