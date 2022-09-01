import { describe, expect, it } from 'vitest'
import { isFunction } from 'yewtils'
import { contrastText } from '../src'

describe('contrast text', () => {
  it('exported', () => {
    expect(isFunction(contrastText)).toBeTruthy()
  })

  it('should return [0,0,0] if the base color is light', () => {
    expect(contrastText([255, 255, 255]).join(',')).toEqual('0,0,0')
    expect(contrastText([244, 184, 184]).join(',')).toEqual('0,0,0')
    expect(contrastText([184, 237, 244]).join(',')).toEqual('0,0,0')
    expect(contrastText([184, 244, 196]).join(',')).toEqual('0,0,0')
    expect(contrastText([243, 244, 184]).join(',')).toEqual('0,0,0')
  })

  it('should return [255,255,255] if the base color is dark', () => {
    expect(contrastText([0, 0, 0]).join(',')).toEqual('255,255,255')
    expect(contrastText([44, 129, 61]).join(',')).toEqual('255,255,255')
    expect(contrastText([124, 44, 129]).join(',')).toEqual('255,255,255')
    expect(contrastText([97, 109, 34]).join(',')).toEqual('255,255,255')
    expect(contrastText([204, 30, 30]).join(',')).toEqual('255,255,255')
  })
})
