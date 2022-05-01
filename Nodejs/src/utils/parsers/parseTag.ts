// VCJ---MS--  imperative verb, jussive, masculine, singular
// VP-P-3MS--  perfective verb, passive, third person, masculine, singular
// A-----MP1R  adjective, masculine, plural, nominative, reduced/construct
// PI------1-  inflected preposition, nominative
// N------S4R  noun, singular, accusative, reduced/construct
// N------S2A  noun, singular, genitive, absolute/negative
// A--P------  adjective, passive
// D---------  adverb

import { getKeyByValue } from "../helpers/getKeyByValue";
import { convertToObject } from "../helpers/convertToObject";

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
  I: "imperfective",
  P: "perfective",
  C: "imperative",
} as const;

type Modifier = ValueOf<typeof modifier>;

const mood = {
  "-": undefined,
  I: "indicative",
  S: "subjunctive",
  J: "jussive",
  E: "energetic",
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

/** Complete tag structure */
const tagMap = [
  category,
  modifier,
  mood,
  voice,
  { "-": undefined },
  person,
  gender,
  number,
  grCase,
  form
]

export const parseTag = (tag: string, outputString: boolean = false) => {
  if (tag.length !== 10) {
    console.error("Tag is corrupt, it should contain 10 characters.", tag, tag.length);
    return;
  }

  const slots = tag.split("");

  const values = slots.map((slot, i) => {
    const output = (tagMap[i] as any)[slot];

    if (slot !== "-" && !output) {
      console.error("Unexpected property:", tag, slot, i);
      return;
    }

    return output;
  });

  if (outputString) {
    return values.filter(item => item).join(", ");
  }

  return convertToObject(tagKeys, values);
}

/**
 * @todo refactor ninja code
 */
const composeTag = (props: string) => {
  const tagBase = Array(10).fill("-");
  const cleanProps = props.split(",").map(item => item.trim().toLowerCase());

  const validProperties = tagMap.reduce((previous: string[], current) => {
    return [...previous, ...Object.values(current)]
  }, [])

  cleanProps.forEach((prop) => {
    if (!validProperties.includes(prop)) throw Error(`Params invalid. '${prop}' is an incorrect value.`);

    const id = tagMap.findIndex(item => Object.values(item).includes(prop))

    if (tagBase[id] === "-") {
      tagBase.splice(id, 1, getKeyByValue(tagMap[id], prop));
      return;
    }

    const newKey = getKeyByValue(tagMap[id], prop);

    tagBase.splice(id, 1, [...tagBase[id], newKey]);
  })

  const output = tagBase.map(slot => {
    if (Array.isArray(slot)) return `[${slot.join("")}]`;

    return slot;
  }).join("");

  return output;
}

// test
// console.log(
//   parseTag("A-----MP1R", true),
//   "\n",
//   parseTag("VP-P-3MS--", true)
// );

// test
console.log(composeTag("noun,perfective,accusative"));
console.log(composeTag("noun, verb, adverb, perfective,accusative"));
