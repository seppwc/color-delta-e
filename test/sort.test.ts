import { describe, expect, it } from 'vitest'
import { isArray } from 'yewtils'
import { sort } from '../src/sort'

describe('sort', () => {
  it('should return an array', () => {
    const arr = ['#000', '#fff', '#e2e', '#777']
    expect(isArray(sort('#222', arr))).toBeTruthy()
  })
  it('should not mutate the origin array', () => {
    const arr = ['#000', '#fff', '#e2e', '#777']
    sort('#222', arr)
    expect(arr).toMatchObject(['#000', '#fff', '#e2e', '#777'])
  })
  it('should return a sorted array', () => {
    const arr = ['#000', '#fff', '#ddd', '#555']
    expect(sort('#000', arr)).toMatchObject(['#000', '#555', '#ddd', '#fff'])
  })
  it('should accept options to ascending/descending order of sort', () => {
    const arr = ['#000', '#fff', '#ddd', '#555']
    expect(sort('#000', arr, { direction: 'dec' })).toMatchObject(['#fff', '#ddd', '#555', '#000'])
    expect(sort('#000', arr, { direction: 'asc' })).toMatchObject(['#000', '#555', '#ddd', '#fff'])
  })
  it('should accept options to change the tuple type', () => {
    const arr = ['#fff', [194, 242, 92], '#777', '#000']
    expect(sort('#222', arr, { type: 'rgb' })).toMatchObject(['#000', '#777', '#fff', [194, 242, 92]])
  })
})
