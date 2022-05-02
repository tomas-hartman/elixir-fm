import { LookupEntity, LookupResponse } from "../../types";
import { convertToObject } from "../helpers/convertToObject";

export const parseLookup = (input: string): LookupResponse => {
  const keys: (keyof LookupEntity)[] = [
    "token",
    "_ref1",
    "_ref2",
    "xtag",
    "transcription",
    "root",
    "morphs",
    "meaning",
    "class"
  ];

  const isVariant = (tagCode: string) => {
    return tagCode.split("")[0] === "-";
  }

  const entityReducer = (prev: LookupEntity[], current: string) => {
    /** Filter out possible empty lines */
    if(!current) return prev;
    
    const val = convertToObject<LookupEntity>(keys, current.split("\t"));

    /** Variants  */
    if(prev.length > 0 && isVariant(val.xtag.code)) {
      const lastMainId = prev.length - 1;

      prev[lastMainId].variants = prev[lastMainId].variants 
        ? [...prev[lastMainId].variants, val] 
        : [val];

      return prev;
    }

    return [...prev, val];
  }

  const resultDataReduced = input.split("\n\n").reduce((prev: LookupResponse, current) => {
    if(!current || !current.trim()) return prev;

    const val = current.split("\n").reduce<LookupEntity[]>(entityReducer, [])
    const currentToken = val[0]?.token;

    return [...prev, {token: currentToken, output: val}]
  }, [])

  return resultDataReduced;
}