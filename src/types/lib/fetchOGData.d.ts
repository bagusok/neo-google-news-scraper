import { NeoGoogleNewsScraperResult } from 'neo-scraper-google-news-types';
export declare const fetchOGDataForLink: (sourceUrl: string) => Promise<{
  readonly link: string;
  readonly image: string;
}>;
export declare const fetchOGData: (
  articles: ReadonlyArray<NeoGoogleNewsScraperResult>
) => Promise<ReadonlyArray<NeoGoogleNewsScraperResult>>;
