import { describe, expect, it } from 'vitest'
import { isArray } from 'yewtils'
import { filter } from '../src'

describe('filter', () => {
  it('should return an array', () => {
    expect(isArray(filter('#000', ['#fff', '#fff', '#fff']))).toBeTruthy()
  })
  it('should not mutate original array', () => {
    const arr = ['#fff', '#fff', '#000']
    filter('#000', arr)
    expect(arr).toHaveLength(3)
  })
  it('should return a filtered array', () => {
    const arr = ['#fff', '#fff', '#000']
    const result = filter('#000', arr)
    expect(result).toHaveLength(2)
    expect(result).toMatchObject(['#fff', '#fff'])
  })
  it('should be able to customise threshold', () => {
    const arr = ['#fff', '#777', '#000']
    const result = filter('#000', arr)
    expect(result).toHaveLength(2)
    expect(result).toMatchObject(['#fff', '#777'])
    expect(filter('#000', arr, { threshold: 50 })).toHaveLength(1)
    expect(filter('#000', arr, { threshold: 50 })).toMatchObject(['#fff'])
  })
  it('should be accept and filter any color type', () => {
    const arr = ['#fff', 'hsl(0,50%,50%)', 'rgb(0,0,0)', [0, 0, 0]]
    const result = filter('#000', arr, { type: 'rgb' })
    expect(result).toHaveLength(2)
    expect(result).toMatchObject(['#fff', 'hsl(0,50%,50%)'])
  })
})
