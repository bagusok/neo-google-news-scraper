import { NeoGoogleNewsScraperResult } from 'neo-scraper-google-news-types';
export declare const fetchPrettyUrlForLink: (
  sourceUrl: string
) => Promise<string>;
export declare const fetchPrettyUrl: (
  articles: ReadonlyArray<NeoGoogleNewsScraperResult>
) => Promise<ReadonlyArray<NeoGoogleNewsScraperResult>>;
