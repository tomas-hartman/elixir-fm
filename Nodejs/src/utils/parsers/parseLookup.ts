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
    "schema",
    "meaning",
    "class"
  ];

  const originalInput = input.slice(0, input.indexOf("\t"));

  const isVariant = (tagCode: string) => {
    return tagCode.split("")[0] === "-";
  }

  const reducer = (prev: LookupEntity[], current: string) => {
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

  const resultDataReduced = input.split("\n").reduce<LookupEntity[]>(reducer, [])

  return {
    token: originalInput,
    output: resultDataReduced
  };
}