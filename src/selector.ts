import { isPerceivable } from './isPerceivable'
import type { ColorTuple } from './types'

interface SelectorOptions {
  base: ColorTuple
  threshold?: number
}

const defaultOptions = {
  threshold: 5,
}

/**
 * provide a base color to compare and a contrast threshold, selector will go through each
 * fallback contrast color and will pick the first fallback thats contrast meets the threshold
 * if none meet contrast ratio selector will return the last fallback supplied
 */
export function selector(options: SelectorOptions, ...fallbacks: ColorTuple[]): ColorTuple {
  const { base, threshold } = { ...defaultOptions, ...options }

  function filter(...filters: ColorTuple[]) {
    if (filters.length > 1) {
      if (!isPerceivable(base, filters[0], threshold))
        return selector(options, ...filters.slice(1))

      else
        return filters[0]
    }
    else {
      return filters[0]
    }
  }

  return filter(...fallbacks)
}

