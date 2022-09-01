import { describe, expect, it } from 'vitest'
import { isFunction } from 'yewtils'
import type { ColorTuple } from '../src'
import { deltaE } from '../src'

describe('DeltaE', () => {
  it('should be exported', () => {
    expect(isFunction(deltaE)).toBeTruthy()
  })

  it('should return a delta e value', () => {
    const tests: Array<{ inputs: [ColorTuple, ColorTuple]; output: number }>
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
      expect(+deltaE(inputs[0], inputs[1]).toPrecision(5)).toEqual(output)
    })
  })
})
