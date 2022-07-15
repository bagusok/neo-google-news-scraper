/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/immutable-data */
import axios from 'axios';
import { load } from 'cheerio';

import { buildQueryString } from './buildQueryString';
import { fetchOGData } from './fetchOGData';
import { fetchPrettyUrl } from './fetchPrettyUrl';

const GOOGLE_NEWS_BASE_URL = 'https://news.google.com/';
const GOOGLE_NEWS_SEARCH_URL = `${GOOGLE_NEWS_BASE_URL}search`;
const DEFAULT_TIME_FRAME = '7d';

export const googleNewsScraper = async (config: {
  readonly searchTerm: string;
  readonly shouldFetchPrettyUrls?: boolean;
  readonly shouldFetchOGData?: boolean;
  readonly queryVars?: {
    readonly hl?: string;
    readonly gl?: string;
    readonly ceid?: string;
  };
  readonly timeFrame?: string;
}): Promise<
  ReadonlyArray<{
    readonly title: string;
    readonly link: string;
    readonly image: string;
    readonly source: string;
    readonly datetime: string | Date;
    readonly time: string;
    readonly prettyUrl?: string;
    readonly ogData?: {
      readonly link: string;
      readonly image: string;
      readonly description: string;
    };
  }>
> => {
  const {
    searchTerm,
    shouldFetchPrettyUrls,
    shouldFetchOGData,
    queryVars,
    timeFrame = DEFAULT_TIME_FRAME,
  } = config;
  const queryString = queryVars ? buildQueryString(queryVars) : '';
  const url = `${GOOGLE_NEWS_SEARCH_URL}?${queryString}&q=${searchTerm} when:${timeFrame}`;
  const res = await axios.get(url);
  const content = res.data;
  const $ = load(content);
  const articles = $('a[href^="./article"]').closest('div[jslog]');
  // eslint-disable-next-line functional/no-let, functional/prefer-readonly-type
  let filteredArticles: Array<{
    readonly title: string;
    readonly link: string;
    readonly image: string;
    readonly source: string;
    readonly datetime: string | Date;
    readonly time: string;
    readonly prettyUrl?: string;
    readonly ogData?: {
      readonly link: string;
      readonly image: string;
      readonly description: string;
    };
  }> = [];
  // eslint-disable-next-line functional/prefer-readonly-type
  const urlChecklist: Array<string> = [];

  $(articles).each(function () {
    const link =
      $(this)
        ?.find('a[href^="./article"]')
        ?.attr('href')
        ?.replace('./', GOOGLE_NEWS_BASE_URL) || '';
    link && urlChecklist.push(link);
    const mainArticle: {
      readonly title: string;
      readonly link: string;
      readonly image: string;
      readonly source: string;
      readonly datetime: string | Date;
      readonly time: string;
      readonly prettyUrl?: string;
      // eslint-disable-next-line functional/prefer-readonly-type
      readonly related?: Array<{
        readonly title: string;
        readonly link: string;
        readonly source: string;
        readonly time: string;
      }>;
      readonly ogData?: {
        readonly link: string;
        readonly image: string;
        readonly description: string;
      };
    } = {
      title: $(this).find('h3').text() || '',
      link: link,
      image: $(this).find('figure').find('img').attr('src') || '',
      source: $(this).find('div:last-child svg+a').text() || '',
      datetime:
        new Date(`${$(this).find('div:last-child time').attr('datetime')}`) ||
        '',
      time: $(this).find('div:last-child time').text() || '',
      related: [],
    };
    const subArticles = $(this).find('div[jsname]').find('article');
    $(subArticles).each(function () {
      const subLink =
        $(this)
          ?.find('a')
          ?.first()
          ?.attr('href')
          ?.replace('./', GOOGLE_NEWS_BASE_URL) || '';
      if (subLink && !urlChecklist?.includes(subLink)) {
        mainArticle?.related?.push({
          title: $(this).find('h4').text() || $(this).find('h4 a').text() || '',
          link: subLink,
          source: $(this)?.find('div:last-child svg+a').text() || '',
          time: $(this)?.find('div:last-child time').text() || '',
        });
      }
    });
    filteredArticles.push(mainArticle);
  });

  if (shouldFetchPrettyUrls || shouldFetchOGData) {
    filteredArticles = await fetchPrettyUrl(filteredArticles);
    if (shouldFetchOGData) {
      filteredArticles = await fetchOGData(filteredArticles);
    }
  }

  return filteredArticles;
};
