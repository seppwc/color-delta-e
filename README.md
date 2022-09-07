![npm](https://img.shields.io/npm/v/color-delta-e?color=crimson&label=latest&logo=npm&style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/color-delta-e?logo=npm&label=min&style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/color-delta-e?logo=npm&label=min-zipped&style=flat-square) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Phl3bas/color-delta-e/CI?style=flat-square)


# color-delta-e

A Tiny library for measuring the perceived visual difference between two colors


## Defining Delta E
ΔE - (Delta E, dE) The measure of change in visual perception of two given colors.

Delta E is a metric for understanding how the human eye perceives color difference. The term delta comes from mathematics, meaning change in a variable or function. The suffix E references the German word Empfindung, which broadly means sensation.

On a typical scale, the Delta E value will range from 0 to 100.


| Delta E |	Perception |
| ------- | ---------- |
|<= 1.0	 | Not perceptible by human eyes. |
|1 - 2 | Perceptible through close observation. |
| 2 - 10 | Perceptible at a glance. |
| 11 - 49 |	Colors are more similar than  opposite |
| 100 |	Colors are exact opposite |

credit to: http://zschuessler.github.io/DeltaE/learn/

## Installation

```bash
npm install color-delta-e

yarn add color-delta-e

pnpm add color-delta-e
```

## API

current beta limitations:
   1. only supports RGB value inputs

### `deltaE`

takes two colors and measures the percievable difference between them and returns the deltaE value `0-100`

```typescript
  import { deltaE } from 'color-delta-e'

  const res = deltaE(
            [55,117,192],
            [14,81,162], 
            'rgb' // need to pass the type of the values if passing a tuple
            )

  res // 14.143
```

you can also pass values as strings, values dont have to be the same type

```typescript
  import { deltaE } from 'color-delta-e'

  const res = deltaE(
            'rgb(55,117,192)'',
            '#0e51a2',  // the types will be inferred when using strings!
            )

  res // 14.143
```



### `isPerceivable`

takes two numbers an returns a boolean indicating if the value is above the threshold `default: 5`


```typescript
import { isPerceivable } from 'color-delta-e'

if(isPerceivable([55,117,192],[14,81,162])){
    // do stuff
}
```

### `contrastText`
takes a color and will return with `black` or `white` which ever contrasts best with provided color, the return type will be in same format inputted, so and rgb string will return an rgb string, a hex string will return a hex string.


```typescript
import { contrastText } from 'color-delta-e'

const res = contrastText([0,0,0])

res // '[255,255,255]'

```


### `selector`
takes in base options including base color to compare to, and threshold. rest arguments are a list of fallback colors to go through. selector will return the first color that has a perceptible contrast that meets the threshold provided. If no contrasting values found, will return the last fallback provided.

```typescript
import { selector } from 'color-delta-e'

const res = selector({
                compare: [0, 0, 0]
            },
            [0, 1, 0],
            [0, 2, 0],
            [200, 30, 10],
            [255, 255, 255]
);

res // [200, 30, 10]
```


values dont have to be the same typescript

```typescript
import { selector } from 'color-delta-e'

const res = selector({
                compare: 'hsl(0, 0%, 0%)'
            },
            'rgb(0, 1, 0)',
            '#002200',
            [200, 30, 10],
            [255, 255, 255]
);

res // [200, 30, 10]
```




### `sampleImage`

takes in an `HTMLImageElement` will sample the image and return the average(median) color in image.

only works in browser environments.

doesn't support crossOrigin images.

```typescript
import { sampleImage } from 'color-delta-e'

const myImgEl = document.querySelector('img')

const res = sampleImage(myImgEl)

res // [100, 23, 221]
```



### `utils`

##### `toRGBString`

##### `toHSLString`

##### `toHexString`

