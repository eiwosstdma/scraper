import { ICard, IFilter, IDeck, ITournament, IConfigurationLinker, TFormat, TPlatform, TOrganizer, TLevelOfPlay } from './types.core';

//Guards
export const guardGeneric = <T>(unk: any, typeInArr: Array<T>): T | null => {
  if (typeof unk !== 'string') return null;

  const isAlive = typeInArr.find(v => v === unk);

  return isAlive === undefined ? null : isAlive as T;
};

export const formatHelper: Array<TFormat> = [ 'vintage', 'legacy', 'modern', 'pioneer', 'standard', 'pauper' ];
export const platformHelper: Array<TPlatform> = [ 'mtgo' ];
export const organizerHelper: Array<TOrganizer> = [ 'wizard' ];
export const levelOfPlayHelper: Array<TLevelOfPlay> = [ 'league', 'preliminary', 'challenge', 'showcase-challenge', 'super-qualifier', 'premier' ];

//Definition
export class Card implements ICard {
  quantity: number;
  name: string;
  linkId?: string;

  constructor(args: any) {
    if (!(args instanceof Object)) throw new TypeError('Argument is not of type Object');

    this.name = args.name ?? 'unknown';
    this.quantity = args.quantity ?? 0;
    if (args.linkId) this.linkId = args.linkId;
  }
}

export class Filter implements IFilter{
  format: TFormat;
  name: string;
  includes: Array<string>;
  excludes: Array<string>;

  constructor(args: any) {
    if (!(args instanceof Object)) throw new TypeError('Argument is not of type Object');

    const isFormat = guardGeneric<TFormat>(args.format, formatHelper);
    this.format = isFormat === null ? 'unknown' : isFormat;
    this.name = args.name ?? 'unknown';
    this.includes = args.includes instanceof Array ? args.includes : [];
    this.excludes = args.excludes instanceof Array ? args.excludes : [];
  }
}

export class Deck implements IDeck {
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

  constructor(args: any) {
    if (!(args instanceof Object)) throw new TypeError('Argument is not of type Object');
    const isFormat = guardGeneric<TFormat>(args.format, formatHelper);

    this.tournamentName = args.tournamentName ?? 'unknown';
    this.playedAt = args.playedAt ?? 'unknown';
    this.name = args.name ?? 'unknown';
    this.subId = args.subId ?? 'unknown';
    this.owner = args.owner ?? 'unknown';
    this.format = isFormat === null ? 'unknown' : isFormat;
    this.main = args.main instanceof Array ? args.main : [];
    this.side = args.side instanceof Array ? args.side : [];

    if (args.id) this.id = args.id;
    if (args.postedAt) this.postedAt = args.postedAt;
    if (args.rank) this.rank = args.rank;
    if (args.point) this.point = args.point;
    if (args.omwp) this.omwp = args.omwp;
    if (args.gwp) this.gwp = args.gwp;
    if (args.ogwp) this.ogwp = args.ogwp;
  }
}

export class Tournament implements ITournament {
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

  constructor(args: any) {
    if (!(args instanceof Object)) throw new TypeError('Argument is not of type Object');

    const isFormat = guardGeneric<TFormat>(args.format, formatHelper);
    const isOrganizer = guardGeneric<TOrganizer>(args.organizer, organizerHelper);
    const isPlatform = guardGeneric<TPlatform>(args.format, platformHelper);
    const isLevelOfPlay = guardGeneric<TLevelOfPlay>(args.format, levelOfPlayHelper);

    this.format = isFormat === null ? 'unknown' : isFormat;
    this.organizer = isOrganizer === null ? 'unknown' : isOrganizer;
    this.platform = isPlatform === null ? 'unknown' : isPlatform;
    this.levelOfPlay = isLevelOfPlay === null ? 'unknown' : isLevelOfPlay;

    this.publicId = args.publicId ?? 'unknown';
    this.name = args.name ?? 'unknown';
    this.playedAt = args.playedAt ?? 'unknown';
    this.postedAt = args.postedAt ?? 'unknown';
    this.linkTo = args.linkTo ?? 'unknown';
    this.totalPlayer = args.totalPlayer ?? 123456;

    if (this.id) this.id = args.id;
  }
}

export class ConfigurationLinker implements IConfigurationLinker {
  wantedFormat: Array<TFormat>;
  wantedLevel: Array<TLevelOfPlay>;

  constructor(args: any) {
    if (!(args instanceof Object)) throw new TypeError('Argument is not of type Object');

    if (args.wantedFormat) {
      this.wantedFormat = [];
      for (const format of args.wantedFormat) {
        const isFormat = guardGeneric<TFormat>(format, formatHelper);
        if (isFormat !== null) this.wantedFormat.push(isFormat);
      }
    }

    if (args.wantedLevel) {
      this.wantedLevel = [];
      for (const format of args.wantedLevel) {
        const isFormat = guardGeneric<TLevelOfPlay>(format, levelOfPlayHelper);
        if (isFormat !== null) this.wantedLevel.push(isFormat);
      }
    }

    this.wantedFormat = args.wantedFormat ?? [];
    this.wantedLevel = args.wantedLevel ?? [];
  }
}
