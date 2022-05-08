import { convertXtag } from "../convertors/xtag";

/**
 * This returns entity object with all properties that will be returned.
 * Its should be passed as a generic.
 * @param keys 
 * @param values 
 * @returns 
 */
export const convertToObject = <T extends unknown>(keys: (keyof T)[], values: any[]): T => {
  const map = keys.map((key, i) => {
    let value = values[i]?.trim();

    switch (key) {
      case "token":
      case "_ref1":
      case "_ref2":
        return [key, value ? value : undefined];
      case "root":
      case "meaning":
        return [key, value ? JSON.parse(value) : undefined];
      case "xtag":
        return convertXtag<keyof T>(key, value);
      default:
        return [key, value]
    }
  });

  const output: T = Object.fromEntries(map);

  return output;
}
