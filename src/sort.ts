import { deltaE } from './deltaE'
import type { ColorTuple, deltaValueType } from './types'

interface SortOptions {
  direction?: 'asc' | 'dec'
  type?: Exclude<deltaValueType, 'hex'>
}

const sortMap: Record<'asc' | 'dec', (type?: Exclude<deltaValueType, 'hex'>) => (comparitor: string | ColorTuple) => (a: any, b: any) => any> = {
  asc: type => comparitor => (a, b) => {
    return deltaE(comparitor as any, a, type) - deltaE(comparitor as any, b, type)
  },
  dec: type => comparitor => (a, b) => {
    return deltaE(comparitor as any, b, type) - deltaE(comparitor as any, a, type)
  },
}

export function sort<T extends any[]>(comparitor: string | ColorTuple, toSort: T, options?: SortOptions): T {
  const direction = options?.direction || 'asc'
  const type = options?.type || 'rgb'

  return Array.from(toSort).sort(sortMap[direction](type)(comparitor)) as T
}
