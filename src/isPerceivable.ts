import { deltaE } from './deltaE'
import type { ColorTuple } from './types'

/**
 * checks if `first` would be noticebly different to the naked eye to `second`
 * returns true if they contrast enough,
 * threshold can be modified by `0 - 100` `(default = 5)`, to change how much difference the colors need to be
 */
export function isPerceivable(
  first: ColorTuple,
  second: ColorTuple,
  threshold = 5,
) {
  const res = deltaE(first, second)

  return Math.round(res) > threshold
}
