import { describe, expect, it } from 'vitest'
import { isFunction } from 'yewtils'
import { isPerceivable } from '../src'

describe('isPerceivable', () => {
  it('exported', () => {
    expect(isFunction(isPerceivable)).toBeTruthy()
  })

  it('should take two colors and return true if perceivibly different', () => {
    expect(isPerceivable([0, 0, 0], [255, 255, 255])).toBe(true)

    expect(isPerceivable([0, 0, 0], [100, 0, 255])).toBe(true)

    expect(isPerceivable([0, 0, 0], [24, 25, 25])).toBe(true)

    expect(isPerceivable([18, 19, 74], [33, 145, 56])).toBe(true)
  })

  it('should take two colors and return false if percevibly similar', () => {
    expect(isPerceivable([0, 0, 0], [1, 1, 1])).toBe(false)

    expect(isPerceivable([0, 0, 0], [0, 0, 0])).toBe(false)
    expect(isPerceivable([18, 19, 74], [8, 13, 78])).toBe(false)
  })

  it('should take a third argument that changes the threshold', () => {
    expect(isPerceivable([18, 19, 74], [8, 13, 78], 1)).toBe(true)

    expect(isPerceivable([18, 19, 74], [33, 145, 56], 100)).toBe(false)
  })
})
