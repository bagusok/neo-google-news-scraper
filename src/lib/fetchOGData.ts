/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
import axios from 'axios';
import { load } from 'cheerio';

export const fetchOGDataForLink = async (sourceUrl: string) => {
  const ogData = { link: '', image: '', description: '' };
  try {
    const response = await axios.get(sourceUrl);
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
  } catch (error) {
    console.error('ERROR: fetchOGDataForLink', sourceUrl);
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
      ogData: await fetchOGDataForLink(article.link),
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
