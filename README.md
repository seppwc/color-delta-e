# color-delta-e

A tiny library for comparing the perceived difference between two colors


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



## API

### `deltaE`

takes two colors and measures the percievable difference between them and returns the deltaE value `0-100`

```typescript rgb(55,117,192)
  const res = deltaE(
            [55,117,192],
            [14,81,162], 
            'rgb')

  res // 14.143
```


### `isPerceivable`

takes two numbers an returns a boolean indicating if the value is above the threshold `default: 5`


```typescript

if(isPerceivable([55,117,192],[14,81,162])){
    // do stuff
}
```

### `contrastText`
takes a color and will return with `#fff` or `#000` which ever contrasts best with provided color


```typescript

const res = contrastText([0,0,0])

res // '#fff'

```


### `selector`
takes in base options including base color to compare to, and threshold. rest arguments are a list of fallback colors to go through. selector will return the first color that has a perceptible contrast that meets the threshold provided. If no contrasting values found, will return the last fallback provided.

```typescript

    const res = selector({
                    base: [0, 0, 0]
                },
                [0, 1, 0],
                [0, 2, 0],
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
    const res = sampleImage(myImgEl)

    res // [100, 23, 221]
```



### `utils`

##### `toRGBString`

##### `toHSLString`

##### `toHexString`

