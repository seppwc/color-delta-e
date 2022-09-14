import { isPerceivable } from './isPerceivable'
import type { ColorTuple, deltaValueType } from './types'

interface FilterOptions {
  threshold?: number
  type?: deltaValueType
}

export function filter<T extends any[]>(comparitor: string | ColorTuple, filterList: T, options?: FilterOptions): any[] {
  options = { threshold: 5, type: 'rgb', ...options }

  return filterList.filter(color => isPerceivable(comparitor as any, color, options))
}
