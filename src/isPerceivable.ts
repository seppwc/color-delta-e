import { isArray, isString } from 'yewtils'
import { deltaE } from './deltaE'
import type { ColorTuple, deltaValueType } from './types'

/**
 * checks if `first` would be noticebly different to the naked eye to `second`
 * returns true if they contrast enough,
 * threshold can be modified by `0 - 100` `(default = 5)`, to change how much difference the colors need to be
 */

interface IsPerceivableOptions {
  threshold?: number
  type?: deltaValueType
}

export function isPerceivable(first: ColorTuple, second: ColorTuple, options?: IsPerceivableOptions): boolean
export function isPerceivable(first: string, second: string, options?: IsPerceivableOptions): boolean
export function isPerceivable(first: unknown, second: unknown, options?: IsPerceivableOptions): boolean {
  const threshold = options?.threshold || 5
  const type = options?.type

  if (!isArray(first) && !isArray(second) && isString(first) && isString(second))
    return Math.round(deltaE(first, second)) > threshold

  return Math.round(deltaE(first as ColorTuple, second as ColorTuple, type as deltaValueType)) > threshold
}
