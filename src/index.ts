/**
 * Export for libs usability
 */
export { ScraperParserMtgo } from './core/mtgo/scraper-parser/scraper-parser.mtgo';
export { LinkBuilderMtgo } from './core/mtgo/link-builder/link-builder.mtgo';
export { filtering } from './core/filter/filter.core';
export {
  Card,
  Filter,
  Deck,
  Tournament,
  ConfigurationLinker,
  Format,
  Platform,
  Organizer,
  LevelOfPlay
} from './core/common.core';

/**
 * Tournament scraping: Around 1 second
 * Link for a day: Around 2 seconds
 */
