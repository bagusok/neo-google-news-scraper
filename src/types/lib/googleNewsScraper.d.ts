import {
  GoogleNewsScraperConfig,
  NeoGoogleNewsScraperResult,
} from 'neo-scraper-google-news-types';
declare const googleNewsScraper: (
  config: GoogleNewsScraperConfig
) => Promise<ReadonlyArray<NeoGoogleNewsScraperResult>>;
export { googleNewsScraper };
