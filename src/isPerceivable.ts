import { deltaE } from './deltaE'
import type { ColorTuple, InputTupleTypes } from './types'

/**
 * checks if `first` would be noticebly different to the naked eye to `second`
 * returns true if they contrast enough,
 * threshold can be modified by `0 - 100` `(default = 5)`, to change how much difference the colors need to be
 */

interface IsPerceivableOptions {
  threshold?: number
  type?: InputTupleTypes
}

export function isPerceivable(first: ColorTuple, second: ColorTuple, options?: IsPerceivableOptions): boolean
export function isPerceivable(first: string, second: string, options?: IsPerceivableOptions): boolean
export function isPerceivable(first: unknown, second: unknown, options?: IsPerceivableOptions): boolean {
  const threshold = options?.threshold || 5
  const type = options?.type || 'rgb'

  return Math.round(deltaE(first as any, second as any, type as any)) > threshold
}
