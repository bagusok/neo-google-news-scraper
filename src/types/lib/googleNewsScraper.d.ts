import {
  GoogleNewsScraperConfig,
  NeoGoogleNewsScraperResult,
} from '../../types/googleNewsScraperTypes';
declare const googleNewsScraper: (
  config: GoogleNewsScraperConfig
) => Promise<ReadonlyArray<NeoGoogleNewsScraperResult>>;
export { googleNewsScraper };
