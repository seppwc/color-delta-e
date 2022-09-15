import { describe, expect, it } from 'vitest'
import { isFunction } from 'yewtils'
import type { RGBColorTuple } from '../src'
import { deltaE } from '../src'

describe('DeltaE', () => {
  it('should be exported', () => {
    expect(isFunction(deltaE)).toBeTruthy()
  })

  it('should return a delta e value', () => {
    const tests: Array<{ inputs: [RGBColorTuple, RGBColorTuple]; output: number }>
     = [
       {
         inputs: [
           [55, 117, 192],
           [14, 81, 162],

         ],
         output: 14.143,
       },
       {
         inputs: [
           [14, 162, 76],
           [14, 162, 150],
         ],
         output: 17.837,
       },
       {
         inputs: [
           [82, 97, 155],
           [198, 110, 71],
         ],
         output: 49.277,
       },
       {
         inputs: [
           [60, 60, 60],
           [68, 68, 68],
         ],
         output: 3.5351,
       },
       {
         inputs: [
           [60, 100, 60],
           [68, 100, 68],
         ],
         output: 2.5805,
       },
       {
         inputs: [
           [0, 34, 68],
           [22, 23, 79],
         ],
         output: 11.350,
       },

       {
         inputs: [
           [0, 0, 0],
           [0, 0, 0],
         ],
         output: 0,
       },
       {
         inputs: [
           [0, 0, 0],
           [255, 255, 255],
         ],
         output: 100,
       },
     ]

    tests.forEach(({ inputs, output }) => {
      expect(+deltaE(inputs[0], inputs[1], 'rgb').toPrecision(5)).toEqual(output)
    })
  })

  it('should accept rgb strings', () => {
    expect(deltaE('rgb(255,0,0)', 'rgb(255,0,0)', 'rgb')).toEqual(0)

    expect(+deltaE('rgb(255,255,0)', 'rgb(255,0,0)', 'rgb').toPrecision(3)).toEqual(61.3)

    expect(+deltaE('rgb(255,255,255)', 'rgb(0,0,0)', 'rgb').toPrecision(3)).toEqual(100)
  })

  it('should infer rgb strings', () => {
    expect(deltaE('rgb(255,0,0)', 'rgb(255,0,0)')).toEqual(0)

    expect(+deltaE('rgb(255,255,0)', 'rgb(255,0,0)').toPrecision(3)).toEqual(61.3)

    expect(+deltaE('rgb(255,255,255)', 'rgb(0,0,0)').toPrecision(3)).toEqual(100)
  })

  it('should accept hsl strings', () => {
    expect(deltaE('hsl(0,50%,50%)', 'hsl(0,50%,50%)', 'hsl')).toEqual(0)

    expect(+deltaE('hsl(0,50%,50%)', 'hsl(50,50%,50%)', 'hsl').toPrecision(3)).toEqual(40.6)

    expect(+deltaE('hsl(0,0%,0%)', 'hsl(0,100%, 100%)', 'hsl').toPrecision(3)).toEqual(100)
  })

  it('should infer hsl strings', () => {
    expect(deltaE('hsl(0,50%,50%)', 'hsl(0,50%,50%)')).toEqual(0)

    expect(+deltaE('hsl(0,50%,50%)', 'hsl(50,50%,50%)').toPrecision(3)).toEqual(40.6)

    expect(+deltaE('hsl(0,0%,0%)', 'hsl(0,100%, 100%)').toPrecision(3)).toEqual(100)
  })

  it('should accept/infer hex strings', () => {
    expect(deltaE('#ff0000', '#ff0000')).toEqual(0)

    expect(+deltaE('#ff0000', '#ff0077').toPrecision(3)).toEqual(21.6)

    expect(+deltaE('#000000', '#ffffff').toPrecision(3)).toEqual(100)
  })

  it('should infer different strings', () => {
    expect(+deltaE('#000000', 'hsl(0,100%,100%)').toPrecision(3)).toEqual(100)

    expect(+deltaE('hsl(0, 0%, 0%)', 'rgb(255,255,255)').toPrecision(3)).toEqual(100)

    expect(+deltaE([0, 0, 0], 'rgb(255,255,255)', 'rgb').toPrecision(3)).toEqual(100)
  })
})
