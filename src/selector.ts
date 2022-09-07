import { isString } from 'yewtils'
import { isPerceivable } from './isPerceivable'
import type { ColorTuple, deltaValueType } from './types'
import { getColorConvertion } from './utils'

interface SelectorOptions {
  compare: ColorTuple | string
  type?: deltaValueType
  threshold?: number
}

const defaultOptions: Pick<Required<SelectorOptions>, 'threshold' | 'type'> = {
  type: 'rgb',
  threshold: 5,
}

/**
 * provide a base color to compare and a contrast threshold, selector will go through each
 * fallback contrast color and will pick the first fallback thats contrast meets the threshold
 * if none meet contrast ratio selector will return the last fallback supplied
 */
export function selector(options: SelectorOptions, ...fallbacks: Array<ColorTuple | string>): ColorTuple | string {
  // eslint-disable-next-line prefer-const
  let { compare, threshold, type }: SelectorOptions = { ...defaultOptions, ...options }

  if (isString(compare)) {
    compare = getColorConvertion(compare)
    type = undefined
  }

  // TODO Better Typeing

  function filter(...filters: any) {
    if (filters.length > 1) {
      if (!isPerceivable(compare as any, filters[0] as any, { threshold, type }))
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

