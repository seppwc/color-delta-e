import { describe, expect, it } from 'vitest'
import { isFunction } from 'yewtils'
import { contrastText } from '../src'

describe('contrast text', () => {
  it('exported', () => {
    expect(isFunction(contrastText)).toBeTruthy()
  })

  it('should return [0,0,0] if the base color is Tuple and light', () => {
    expect(contrastText([255, 255, 255], 'rgb').join(',')).toEqual('0,0,0')
    expect(contrastText([244, 184, 184], 'rgb').join(',')).toEqual('0,0,0')
    expect(contrastText([184, 237, 244], 'rgb').join(',')).toEqual('0,0,0')
    expect(contrastText([184, 244, 196], 'rgb').join(',')).toEqual('0,0,0')
    expect(contrastText([243, 244, 184], 'rgb').join(',')).toEqual('0,0,0')
  })

  it('should return [255,255,255] if the base color is Tuple and dark', () => {
    expect(contrastText([0, 0, 0], 'rgb').join(',')).toEqual('255,255,255')
    expect(contrastText([44, 129, 61], 'rgb').join(',')).toEqual('255,255,255')
    expect(contrastText([124, 44, 129], 'rgb').join(',')).toEqual('255,255,255')
    expect(contrastText([97, 109, 34], 'rgb').join(',')).toEqual('255,255,255')
    expect(contrastText([204, 30, 30], 'rgb').join(',')).toEqual('255,255,255')
  })

  it('should return rgb(0, 0, 0) if the base color rgbString and is light', () => {
    expect(contrastText('rgb(255, 255, 255)')).toEqual('rgb(0, 0, 0)')
    expect(contrastText('rgb(244, 184, 184)')).toEqual('rgb(0, 0, 0)')
    expect(contrastText('rgb(184, 237, 244)')).toEqual('rgb(0, 0, 0)')
    expect(contrastText('rgb(184, 244, 196)')).toEqual('rgb(0, 0, 0)')
    expect(contrastText('rgb(243, 244, 184)')).toEqual('rgb(0, 0, 0)')
  })

  it('should return rgb(255, 255, 255) if the base color rgbString and is dark', () => {
    expect(contrastText('rgb(0, 0, 0)')).toEqual('rgb(255, 255, 255)')
    expect(contrastText('rgb(44, 129, 61)')).toEqual('rgb(255, 255, 255)')
    expect(contrastText('rgb(124, 44, 129)')).toEqual('rgb(255, 255, 255)')
    expect(contrastText('rgb(97, 109, 34)')).toEqual('rgb(255, 255, 255)')
    expect(contrastText('rgb(204, 30, 30)')).toEqual('rgb(255, 255, 255)')
  })

  it('should return #000 if the base color hexString and is light', () => {
    expect(contrastText('#ffffff')).toEqual('#000')
    expect(contrastText('#e231d1')).toEqual('#000')
    expect(contrastText('#c0ede6')).toEqual('#000')
    expect(contrastText('#bac8e0')).toEqual('#000')
    expect(contrastText('#e6edaf')).toEqual('#000')
  })

  it('should return #fff if the base color hexString and is dark', () => {
    expect(contrastText('#000000')).toEqual('#fff')
    expect(contrastText('#202d2d')).toEqual('#fff')
    expect(contrastText('#444444')).toEqual('#fff')
    expect(contrastText('#333333')).toEqual('#fff')
    expect(contrastText('#222222')).toEqual('#fff')
  })

  it('should return hsl(0, 0%, 0%) if the base color hslString and is light', () => {
    expect(contrastText('hsl(0, 100%, 100%)')).toEqual('hsl(0, 0%, 0%)')
    expect(contrastText('hsl(67, 63%, 81%)')).toEqual('hsl(0, 0%, 0%)')
    expect(contrastText('hsl(184, 63%, 81%)')).toEqual('hsl(0, 0%, 0%)')
    expect(contrastText('hsl(211, 73%, 81%)')).toEqual('hsl(0, 0%, 0%)')
    expect(contrastText('hsl(2, 50%, 88%)')).toEqual('hsl(0, 0%, 0%)')
  })

  it('should return hsl(0, 100%, 100%) if the base color hslString and is dark', () => {
    expect(contrastText('hsl(0, 0%, 0%)')).toEqual('hsl(0, 100%, 100%)')
    expect(contrastText('hsl(2, 64%, 32%)')).toEqual('hsl(0, 100%, 100%)')
    expect(contrastText('hsl(210, 69%, 31%)')).toEqual('hsl(0, 100%, 100%)')
    expect(contrastText('hsl(262, 75%, 32%)')).toEqual('hsl(0, 100%, 100%)')
    expect(contrastText('hsl(120, 67%, 25%)')).toEqual('hsl(0, 100%, 100%)')
  })
})
