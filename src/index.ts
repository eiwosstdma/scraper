/**
 * Export for libs usability
 */
export {
  getDataFromUrl,
  parseMtgo,
  scraperParserRUN,
  dataOfTheDay
} from './core/mtgo/scraper-parser/scraper-parser.mtgo';

export {
  linkGenerator,
  generateLinksFrom,
  checkLink,
  checkArrayOfLinks,
  linkBuilderRUN
} from './core/mtgo/link-builder/link-builder.mtgo';

/**
 * For the new website
 */
export {
  getDataFromYearMonth,
  extractLinks
} from './core/mtgo/link-searcher/link-searcher.mtgo';

export {
  rawParserMtgo
} from './core/mtgo/raw-parser.mtgo';

export { filtering } from './core/filter/filter.core';
export {
  ICard,
  IFilter,
  IDeck,
  ITournament,
  IConfigurationLinker,
  TFormat,
  TPlatform,
  TOrganizer,
  TLevelOfPlay,
  AHelperFormat,
  AHelperPlatform,
  AHelperOrganizer,
  AHelperLevel
} from './core/types.core';

export {
  Card,
  Filter,
  Deck,
  Tournament,
  ConfigurationLinker
} from './core/definitions.core';

export {
  guardGeneric,
} from './core/utilities.core';
