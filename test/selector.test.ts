import { describe, expect, it } from 'vitest'
import { isFunction } from 'yewtils'
import { selector } from '../src'

describe('selector', () => {
  it('exported', () => {
    expect(isFunction(selector)).toEqual(true)
  })

  it('should take in a base color and filters', () => {
    expect(selector({ base: [0, 0, 0] }, [255, 255, 255])).toMatchObject([255, 255, 255])
  })

  it('should return the first filter that is visually percievable', () => {
    expect(selector({ base: [0, 0, 0] }, [1, 1, 1], [2, 2, 2], [111, 111, 111], [255, 255, 255])).toMatchObject([111, 111, 111])

    expect(selector({ base: [18, 19, 74] }, [37, 16, 76], [36, 14, 78], [76, 34, 155], [255, 255, 255])).toMatchObject([76, 34, 155])
  })

  it('should return the last filter if NONE are visually percievable', () => {
    expect(selector({ base: [0, 0, 0] }, [1, 1, 1], [2, 2, 2], [3, 3, 3])).toMatchObject([3, 3, 3])

    expect(selector({ base: [18, 19, 74] }, [37, 16, 76], [36, 14, 78])).toMatchObject([36, 14, 78])
  })
})
