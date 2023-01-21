/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Types
export type TScriptReport = {
  url: string,
  results: Record<string, number>
}

export type TBadStrings = Record<DrainerType, string[]>

export type TFlags = {
  isHTTrack: boolean,
  isMonkeyDrainer: boolean,
  isInvalidMeta: boolean,
  isFakeMint: boolean
};

// Enums
export enum DrainerType {
  GENERIC = "GENERIC_DRAINER",
  SEAPORT = "SEAPORT_DRAINER",
  MONKEY = "MONKEY_DRAINER"
}