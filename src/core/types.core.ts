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

export type TFormat = 'unknown' | 'vintage' | 'legacy' | 'modern' | 'pioneer' | 'standard' | 'pauper';

export type TPlatform = 'mtgo' | 'unknown';

export type TOrganizer = 'wizard' | 'unknown';

export type TLevelOfPlay = 'unknown' | 'league' | 'preliminary' | 'challenge' | 'showcase-challenge' | 'super-qualifier' | 'premier';
