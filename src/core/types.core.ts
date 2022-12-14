/**
 * Types for the Application
 */
export interface ICard {
  quantity: number;
  name: string;
  linkId?: string;
}

export interface IFilter {
  format: TFormat;
  name: string;
  includes: Array<string>;
  excludes: Array<string>;
}

export interface IDeck {
  id?: number;
  tournamentName: string;
  playedAt: string;
  postedAt?: string;
  name: string;
  subId: string;
  owner: string;
  format: TFormat;
  main: Array<ICard>;
  side: Array<ICard>;
  rank?: number;
  point?: number;
  omwp?: string;
  gwp?: string;
  ogwp?: string;
}

export interface ITournament {
  id?: number;
  publicId: string;
  name: string;
  playedAt: string;
  postedAt: string;
  linkTo: string;
  format: TFormat;
  totalPlayer: number;
  organizer: TOrganizer;
  platform: TPlatform;
  levelOfPlay: TLevelOfPlay;
}

export interface IConfigurationLinker {
  wantedFormat: Array<TFormat>;
  wantedLevel?: Array<TLevelOfPlay>;
}

export const AHelperFormat = [ 'unknown', 'vintage', 'legacy', 'modern', 'pioneer', 'standard', 'pauper' ] as const;
export type TFormat = typeof AHelperFormat[number];

export const AHelperPlatform = [ 'unknown', 'mtgo' ] as const;
export type TPlatform = typeof AHelperPlatform[number];

export const AHelperOrganizer = [ 'unknown', 'wizard' ] as const;
export type TOrganizer = typeof AHelperOrganizer[number];

export const AHelperLevel = [
  'unknown',
  'league',
  'preliminary',
  'challenge',
  'premier',
  'showcase-challenge',
  'showcase-qualifier',
  'eternal-weekend',
  'super-qualifier',
] as const;
export type TLevelOfPlay = typeof AHelperLevel[number];

/**
 *
 */
export interface MetaData {
  title: string;
  postedAt: string;
  name: string;
  playersNumber: number;
  playersName: Array<string>;
  uniqueID: string;
  format: TFormat;
  rawResults: string;
  rawBinary: string;
}
