/**
 * Export for libs usability
 */
export {
  getDataFromUrl,
  parseMtgo,
  scraperParserRUN
} from './core/mtgo/scraper-parser/scraper-parser.mtgo';

export {
  linkGenerator,
  checkLink,
  checkArrayOfLinks,
  linkBuilderRUN
} from './core/mtgo/link-builder/link-builder.mtgo';

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

/**
 * Tournament scraping: Around 1 second
 * Link for a day: Around 2 seconds
 */
