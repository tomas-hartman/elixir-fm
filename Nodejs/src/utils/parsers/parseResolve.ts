import { ResolveEntity, ResolveRes, ResolveResponse } from "../../types";
import { convertToObject } from "../helpers/convertToObject";

export const parseResolve = (input: string): ResolveResponse => {
  const keys: (keyof ResolveEntity)[] = [
    "token",
    "transcription",
    "xtag",
    "inflected",
    "morphs",
    "root",
    "shortSchema",
    "lemma",
    "_ref",
    "meaning"
  ];

  /**
   * \n\n - separates token groups
   * \n - separates entities in groups
   * \t - separates properties
   */

  /**
   * Parses groups for multiple entities
   */
  const tokenGroupReducer = (prev: ResolveResponse, current: string) => {
    if(!current || !current.trim()) return prev;

    const entities = current.split("\n").reduce(entityReducer, []);
    const currentToken = entities[0]?.token;

    return [...prev, {token: currentToken, output: entities}];
  }

  /**
   * Parses each tokens
   */
  const entityReducer = (prev: ResolveEntity[], current: string) => {
    if(!current || !current.trim()) return prev;

    const val = convertToObject(keys, current.split("\t"));

    return [...prev, val];
  }

  return input.split("\n\n").reduce(tokenGroupReducer, []);
}

// const test = "أهلاً\t'AhilaN\tA-----MS4I\t'AhilaN\tFACiL |<< \"aN\"\t\"' h l\"\tFACiL\t'Ahil\t(534,2)\t[\"get married\"]\n     \t'AhilaN\tA-----MS4I\t'AhilaN\tFACiL |<< \"aN\"\t\"' h l\"\tFACiL\t'Ahil\t(534,5)\t[\"be familiar\"]\n     \t'ahlaN\tN------S4I\t'ahlaN\tFaCL |<< \"aN\"\t\"' h l\"\tFaCL\t'ahl\t(534,21)\t[\"family\",\"people\",\"folk\",\"indigenous people\"]\n     \t'ahlaN\tA-----MS4I\t'ahlaN\tFaCL |<< \"aN\"\t\"' h l\"\tFaCL\t'ahl\t(534,22)\t[\"qualified\"]\n     \t'ahlaN\tI---------\t'ahlaN\tFaCL |<< \"aN\"\t\"' h l\"\tFaCL |<< \"aN\"\t'ahlaN\t(534,23)\t[\"welcome !\"]\n     \t'AhilaN\tA-----MS4I\t'AhilaN\tFACiL |<< \"aN\"\t\"' h l\"\tFACiL\t'Ahil\t(534,27)\t[\"populated\"]\n\nوسهلاً\twa-sahlaN\tC---------\twa\t_____\t\"wa\"\t_____\twa\t(1612,1)\t[\"and\"]\n      \t         \tA-----MS4I\tsahlaN\tFaCL |<< \"aN\"\t\"s h l\"\tFaCL\tsahl\t(8279,28)\t[\"easy\",\"simple\"]\n\n\n";
// parseResolve(test);