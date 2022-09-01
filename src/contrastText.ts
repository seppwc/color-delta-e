import { isPerceivable } from './isPerceivable'
import type { ColorTuple } from './types'

/**
 * returns either '#000' or '#fff' base on which contrasts better with provided color
 */
export function contrastText(color: ColorTuple): ColorTuple {
  if (isPerceivable(color, [255, 255, 255], 50))
    return [255, 255, 255]

  else
    return [0, 0, 0]
}

