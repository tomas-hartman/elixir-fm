import { convertXtag } from "../convertors/xtag";

/**
 * This returns entity object with all properties that will be returned.
 * Its should be passed as a generic.
 * @param keys 
 * @param values 
 * @returns 
 */
export const convertToObject = <T extends unknown>(keys: (keyof T)[], values: any[]): T => {
  const map = keys.map((_, i) => {
    if(values[i]) {
      if(keys[i] === "root") return [keys[i], JSON.parse(values[i])];
      if(keys[i] === "meaning") return [keys[i], JSON.parse(values[i])];
      if(keys[i] === "xtag") return convertXtag<keyof T>(keys[i], values[i]);
    }
  
    return [keys[i], values[i]]
  });

  const output: T = Object.fromEntries(map);

  return output;
}