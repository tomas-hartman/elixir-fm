import { XtagObject } from "../../types"
import { parseTag } from "../parsers/parseTag"

/**
 * Specifies how output for xtag should look like
 * @param key standardized name of property
 * @param value value in parsed response
 */
export const convertXtag = <T>(key: T, value: any): [T, XtagObject] => {

  return [
    key, 
    {
      code: value, 
      description: parseTag(value, true)
    }
  ]
}

