// VCJ---MS--  imperative verb, jussive, masculine, singular
// VP-P-3MS--  perfective verb, passive, third person, masculine, singular
// A-----MP1R  adjective, masculine, plural, nominative, reduced/construct
// PI------1-  inflected preposition, nominative
// N------S4R  noun, singular, accusative, reduced/construct
// N------S2A  noun, singular, genitive, absolute/negative
// A--P------  adjective, passive
// D---------  adverb

import { convertToObject } from "../helpers";

const tagKeys = ["category", "categoryModifier", "mood", "voice", "-", "person", "gender", "number", "case", "form"];

type ValueOf<T> = T[keyof T];

const category = {
  A: "adjective",
  N: "noun",
  V: "verb",
  D: "adverb",
  P: "preposition"
} as const;

type Category = ValueOf<typeof category>;

const modifier = {
  "-": undefined,
  P: "perfective",
  I: "inflected",
  C: "imperative",
} as const;

type Modifier = ValueOf<typeof modifier>;

const mood = {
  "-": undefined,
  J: "jussive",
} as const;

type Mood = ValueOf<typeof mood>;

const voice = {
  "-": undefined,
  P: "passive",
  A: "active"
} as const;

type Voice = ValueOf<typeof voice>;

const person = {
  "-": undefined,
  1: "first person",
  2: "second person",
  3: "third person"
} as const;

type Person = ValueOf<typeof person>;

const gender = {
  "-": undefined,
  M: "masculine",
  F: "feminine"
} as const;

type Gender = ValueOf<typeof gender>;

const number = {
  "-": undefined,
  S: "singular",
  P: "plural",
  D: "dual"
} as const;

type Number = ValueOf<typeof number>;

const grCase = {
  "-": undefined,
  1: "nominative",
  2: "genitive",
  4: "accusative"
} as const;

type Case = ValueOf<typeof grCase>;

const form = {
  "-": undefined,
  I: "indefinite",
  R: "reduced/construct"
} as const;

type Form = ValueOf<typeof form>;

type TagKeys = typeof category | typeof modifier | typeof mood | typeof voice | typeof person | typeof gender | typeof number | typeof grCase | typeof form;
type TagValues = Category | Modifier | Mood | Voice | Person | Gender | Number | Case | Form;

const tagOptions = [
  category,
  modifier,
  mood,
  voice,
  {"-": undefined},
  person,
  gender,
  number,
  grCase,
  form
]

export const parseTag = (tag: string, outputString: boolean = false) => {
  if(tag.length !== 10) {
    console.error("Tag is corrupt, it should contain 10 characters.", tag, tag.length);
    return;
  }

  const entities = tag.split("");

  const values = entities.map((entity, i) => {
    const output = (tagOptions[i] as any)[entity];

    if(entity !== "-" && !output) {
      console.error("Unexpected property:", tag, entity, i);
      return;
    }

    return output;
  });

  if(outputString) {
    return values.filter(item => item).join(", ");
  }
  
  return convertToObject(tagKeys, values);
}

// test
// console.log(
//   parseTag("A-----MP1R", true),
//   parseTag("VP-P-3MS--", true)
// );

