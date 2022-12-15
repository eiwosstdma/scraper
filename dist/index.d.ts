/**
 * Types for the Application
 */
interface ICard {
    quantity: number;
    name: string;
    linkId?: string;
}
interface IFilter {
    format: TFormat;
    name: string;
    includes: Array<string>;
    excludes: Array<string>;
}
interface IDeck {
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
interface ITournament {
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
interface IConfigurationLinker {
    wantedFormat: Array<TFormat>;
    wantedLevel?: Array<TLevelOfPlay>;
}
declare const AHelperFormat: readonly ["unknown", "vintage", "legacy", "modern", "pioneer", "standard", "pauper"];
declare type TFormat = typeof AHelperFormat[number];
declare const AHelperPlatform: readonly ["unknown", "mtgo"];
declare type TPlatform = typeof AHelperPlatform[number];
declare const AHelperOrganizer: readonly ["unknown", "wizard"];
declare type TOrganizer = typeof AHelperOrganizer[number];
declare const AHelperLevel: readonly ["unknown", "league", "preliminary", "challenge", "premier", "showcase-challenge", "showcase-qualifier", "eternal-weekend", "super-qualifier"];
declare type TLevelOfPlay = typeof AHelperLevel[number];
/**
 *
 */
interface MetaData {
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

/**
 * Node imports
 */

declare function getDataFromUrl(url: string): Promise<null | {
    name: string;
    data: string;
}>;
declare function parseMtgo(name: string, content: string): Promise<null | {
    tournamentData: ITournament;
    finalDeckLists: Array<IDeck>;
}>;
declare function scraperParserRUN(url: string): Promise<{
    tournamentData: ITournament;
    finalDeckLists: Array<IDeck>;
} | null>;
declare function dataOfTheDay(configuration?: IConfigurationLinker): Promise<({
    tournamentData: ITournament;
    finalDeckLists: IDeck[];
} | null)[]>;

/**
 * Node imports
 */

declare function linkGenerator(howManyDaysBackward: number, configuration?: IConfigurationLinker): Array<string>;
declare function generateLinksFrom(fromTheDay: number, configuration?: IConfigurationLinker): Array<string>;
declare function checkLink(link: string, awaitFor?: number): Promise<string | null>;
declare function checkArrayOfLinks(links: Array<string>, awaitFor?: number): Promise<(string | null)[]>;
declare function linkBuilderRUN(howMuchBackward: number, configuration?: IConfigurationLinker, arrOfLinks?: Array<string>): Promise<Array<string>>;

/**
 * Exports
 */
declare const getDataFromYearMonth: (monthInNumber?: number, yearInNumber?: number) => Promise<string>;
declare const extractLinks: (rawData: string) => (string | null | undefined)[];

/**
 * Node imports
 */

/**
 * Types
 */
/**
 * Application imports
 */
/**
 * Gives you back an object with;
 * rawBinary is the HTML of the page in binary.
 * rawResults is the result object that lives in the binary, which gives you players, decklists, results, and standings
 */
declare const rawParserMtgo: (url: string) => Promise<MetaData>;

declare const filtering: (deck: IDeck, filter: IFilter) => IFilter['name'] | null;

declare class Card implements ICard {
    quantity: number;
    name: string;
    linkId?: string;
    constructor(args: any);
}
declare class Filter implements IFilter {
    format: TFormat;
    name: string;
    includes: Array<string>;
    excludes: Array<string>;
    constructor(args: any | IFilter);
}
declare class Deck implements IDeck {
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
    constructor(args: any);
}
declare class Tournament implements ITournament {
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
    constructor(args: any);
}
declare class ConfigurationLinker implements IConfigurationLinker {
    wantedFormat: Array<TFormat>;
    wantedLevel: Array<TLevelOfPlay>;
    constructor(args: any);
}

declare const guardGeneric: <T>(unk: any, typeInArr: Readonly<Array<string>>) => T | null;

export { AHelperFormat, AHelperLevel, AHelperOrganizer, AHelperPlatform, Card, ConfigurationLinker, Deck, Filter, ICard, IConfigurationLinker, IDeck, IFilter, ITournament, TFormat, TLevelOfPlay, TOrganizer, TPlatform, Tournament, checkArrayOfLinks, checkLink, dataOfTheDay, extractLinks, filtering, generateLinksFrom, getDataFromUrl, getDataFromYearMonth, guardGeneric, linkBuilderRUN, linkGenerator, parseMtgo, rawParserMtgo, scraperParserRUN };
