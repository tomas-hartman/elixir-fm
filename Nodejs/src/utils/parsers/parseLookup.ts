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

  const isVariant = (ref2?: string) => {
    return !ref2?.trim();
  }

  const entityReducer = (prev: LookupEntity[], current: string) => {
    /** Filter out possible empty lines */
    if(!current) return prev;
    
    const val = convertToObject<LookupEntity>(keys, current.split("\t"));

    /** Variants  */
    if(prev.length > 0 && isVariant(val._ref2)) {
      const lastMainId = prev.length - 1;
      const prevTag = prev[lastMainId].variants?.[prev[lastMainId].variants?.length - 1].xtag; 

      if(!val.xtag?.code?.trim() && prevTag) {
        val.xtag = prevTag;
      }

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
    const refGen = val[0]?._ref1;

    return [...prev, {token: currentToken, _ref1: refGen, output: val}]
  }, [])

  return resultDataReduced;
}