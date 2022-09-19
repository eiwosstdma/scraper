/**
 *
 */


/**
 * Types for the Application
 */
export interface Card {
  quantity: number;
  name: string;
  id?: string;
}

export interface Filter {
  format: Format;
  name: string;
  includes: Array<string>;
  excludes: Array<string>;
}

export interface CollectedTournament {
  id?: number;
  name: string;
  linkTo: string;
}

export interface Deck {
  id?: number;
  tournamentName: string;
  playedAt: string;
  postedAt?: string;
  name: string;
  subId: string;
  owner: string;
  format: Format;
  main: Array<Card>;
  side: Array<Card>;
  rank?: number;
  point?: number;
  omwp?: string;
  gwp?: string;
  ogwp?: string;
}

export interface Tournament {
  id?: number;
  publicId: string;
  name: string;
  playedAt: string;
  postedAt: string;
  linkTo: string;
  format: Format;
  totalPlayer: number;
  organizer: Organizer;
  platform: Platform;
  levelOfPlay: LevelOfPlay;
}

export interface ConfigurationLinker {
  wantedFormat: Array<Format>;
  wantedLevel?: Array<LevelOfPlay>;
}

export type Format = 'vintage' | 'legacy' | 'modern' | 'pioneer' | 'standard' | 'pauper';

export type Platform = 'mtgo';

export type Organizer = 'wizard';

export type LevelOfPlay = 'league' | 'preliminary' | 'challenge' | 'showcase-challenge' | 'super-qualifier' | 'premier';
