/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
import axios from 'axios';
import { load } from 'cheerio';
import { NeoGoogleNewsScraperResult } from 'neo-scraper-google-news';

export const fetchOGDataForLink = async (sourceUrl: string) => {
  const ogData = { link: '', image: '' };
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
    }
  } catch (error) {
    console.error('ERROR: fetchOGDataForLink', sourceUrl);
  }
  return ogData;
};

export const fetchOGData = async (
  articles: Array<NeoGoogleNewsScraperResult>
): Promise<Array<NeoGoogleNewsScraperResult>> => {
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
            ogData: { link: '', image: '' },
          }
  );
  return articleWithMetaDataList;
};
