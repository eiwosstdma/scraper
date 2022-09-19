/**
 * Node imports
 */

/**
 * Module imports
 */

/**
 * Application imports
 */
import { ScraperParserMtgo } from './core/mtgo/scraper-parser.mtgo';
import { LinkBuilderMtgo } from './core/mtgo/link-builder.mtgo';

/**
 * Export for libs usability
 */
export const index = {
  MtgoScraper: ScraperParserMtgo,
  MtgoLinker: LinkBuilderMtgo
};