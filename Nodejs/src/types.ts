export type XtagObject = {
  code: string,
  description: string | {[x: string]: {}} | undefined,
}

/**
 * @todo Better property naming!
 */
export type LookupEntity = {
  /** Orthography */
  ar: string,
  /** @todo Ortography references */
  _ref1: string,
  _ref2: string,
  xtag: XtagObject,
  /** Phonetic transcription (citation form) */
  transcription: string,
  /** Word root */
  root: string,
  /** Morphs of citation form */
  schema: string,
  /** Lexical reference */
  meaning: string[],
  /** Derivational class */
  class: string,
  /** Variants and derivations */
  variants: Omit<LookupEntity, "meaning" | "stem" | "variant">[]
}

export interface LookupRes {
  input: string,
  output: LookupEntity[]
}

export interface ResolveEntity {
  _: string;
  transcription: string,
  xtag: string,
  inflected: string,
  schema: string,
  root: string,
  shortSchema: string,
  lemma: string,
  _ref: string,
  meaning: string[],
}

export interface ResolveRes {
  [key: string]: ResolveEntity[]
}

export interface EntityResponse<T> {
  token: string;
  variants: T[]
}