/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
import axios from 'axios';
import { load } from 'cheerio';

import customAxios from './axiosInterceptor';

export const fetchOGDataForLink = async (sourceUrl: string) => {
  const ogData = { link: '', image: '', description: '' };
  try {
    const response = await customAxios.get(sourceUrl);
    if (response.data) {
      // Scrape OG Meta Data from page source
      const $ = load(response.data);
      const img = $("meta[property='og:image']").attr('content');
      if (img) {
        ogData.image = img;
      }
      const url = $("meta[property='og:url']").attr('content');
      if (url) {
        ogData.link = url;
      }
      const description = $("meta[property='og:description']").attr('content');
      if (description) {
        ogData.description = description;
      }
    }
  } catch (error: unknown) {
    console.error('ERROR: fetchOGDataForLink', sourceUrl);
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      console.error(error.message);
    } else {
      // Just a stock error
      console.error(error);
    }
  }
  return ogData;
};

export const fetchOGData = async (
  articles: Array<{
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
): Promise<
  Array<{
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
  const articleWithMetaDataPromises = await Promise.allSettled(
    articles.map(async (article) => ({
      ...article,
      ogData: article.prettyUrl
        ? await fetchOGDataForLink(article.prettyUrl)
        : { link: '', image: '', description: '' },
    }))
  );
  const articleWithMetaDataList = articleWithMetaDataPromises.map(
    (articleWithMetaDataPromise) =>
      articleWithMetaDataPromise.status === 'fulfilled'
        ? articleWithMetaDataPromise.value
        : {
            title: '',
            link: '',
            image: '',
            source: '',
            datetime: new Date(),
            time: '',
            ogData: { link: '', image: '', description: '' },
          }
  );
  return articleWithMetaDataList;
};
