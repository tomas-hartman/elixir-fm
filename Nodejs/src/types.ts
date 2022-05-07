export type XtagObject = {
  code: string,
  description: string | {[x: string]: {}} | undefined,
}

/**
 * @todo Better property naming!
 */
export type LookupEntity = {
  /** Token that was used to resolve action  */
  token: string,
  /** @todo Ortography references */
  _ref1: string,
  _ref2: string,
  xtag: XtagObject,
  /** Phonetic transcription (citation form) */
  transcription: string,
  /** Word root */
  root: string,
  /** Morphs of citation form */
  morphs: string,
  /** Lexical reference */
  meaning: string[],
  /** Derivational class */
  class: string,
  /** Variants and derivations */
  variants: Omit<LookupEntity, "meaning" | "stem" | "variant">[]
}

/**
 * @todo Better property naming!
 * @todo Create generic Entity with common properties
 */
export interface ResolveEntity {
  token: string;
  transcription: string,
  xtag: string,
  inflected: string,
  /** Morphs of citation form */
  morphs: string,
  root: string,
  shortSchema: string,
  lemma: string,
  _ref: string,
  meaning: string[],
}

/**
 * General definition for responses
 */
export type EntityResponse<T> = {
  /** Token that was used to resolve action (lookup, resolve etc) */
  token: string;
  /** @todo rename to omething more suitable */
  output: T[];
}

export type RequestError = {
  status: number,
  reason: string,
}

/** replaces ResolveRes */
export type ResolveResponse = EntityResponse<ResolveEntity>[];
/** replaces LookupRes */
export type LookupResponse = EntityResponse<LookupEntity>[];

/** @todo */
// export type DeriveResponse = EntityResponse<DeriveEntity>;
// export type InflectResponse = EntityResponse<InflectEntity>;

/**
 * @deprecated use ResolveResponse
 */
export interface ResolveRes {
  [key: string]: ResolveEntity[]
}

/**
 * @deprecated Do not use.
 */
export interface __EntityResponse<T> {
  token: string;
  variants: T[]
}