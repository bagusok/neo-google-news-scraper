# Google News Scraper in Typescript

A lightweight typescript package that scrapes article data from Google News. Simply pass a keyword or phrase, and the results are returned as an array of JSON objects.

- [Installation](#installation)
- [Usage](#usage)
- [Output](#output)
- [Contribute](#contribute)
- [Issues](#issues)

## Installation

```bash
# Install via NPM
npm i neo-scraper-google-news

# Install via Yarn
yarn add neo-scraper-google-news
```

## Usage

```javascript
// Require the package
import { googleNewsScraper } from 'neo-scraper-google-news';

// Execute within an async function, pass a config object (further documentation below)
const articles = await googleNewsScraper({
  searchTerm: 'business OR entertainment',
  shouldFetchPrettyUrls: true,
  shouldFetchOGData: true,
  queryVars: {
    hl: 'en-US',
    gl: 'US',
    ceid: 'US:en',
  },
  timeframe: '7d',
});
```

## Output

The output is an array of JSON objects, with each article following the structure below:

```json
[
  {
    "title": "India Focus: Beam Suntory travel retail focus, Dole juice innovation, fresh produce shelf life booster and more feature in our round-up",
    "link": "https://news.google.com/articles/CBMiogFodHRwczovL3d3dy5mb29kbmF2aWdhdG9yLWFzaWEuY29tL0FydGljbGUvMjAyMi8wNy8xNS9pbmRpYS1mb2N1cy1iZWFtLXN1bnRvcnktdHJhdmVsLXJldGFpbC1mb2N1cy1kb2xlLWp1aWNlLWlubm92YXRpb24tZnJlc2gtcHJvZHVjZS1zaGVsZi1saWZlLWJvb3N0ZXItYW5kLW1vcmXSAQA?hl=en-US&gl=US&ceid=US%3Aen",
    "image": "https://lh3.googleusercontent.com/proxy/_aaG4IGctsytZsLpf1pmGbBbmmktoM4iCleYUZCsVsXCTdUmAmJ4TynWucT6zbA6ZXwVslewuZbr7wYse07Z3YNxsw970RbBDJz_8u7zEJhwcKTw3GTDsV3PonXP4mMDltxND6s_FHXgEzkxxBrd9bGRa_3qEptVcvCLnaHmvXUSOTG_DP7lz3xVCdJE27xVZiq9AKVjqsbCswpsVE-kuhNWJPlnJBArl06kOD6B0QWNCC6YGMmZjDmVPZkG0UDERKrhXciXLtXYX5Dt0Fsm0A6Md_lGU1sFz6F5191EdD7c7v8wQpxxk9aBtJtAs3W6DV0sD-cucrkdNi2Qk8-wa55pkK5FTO4D3TORNpdMMGhByOnFcq_Wo2LPhv_4J0vWQUzxw0K4F6c_PxXWfL4j01RFTAvzwIhpeCYuVkAubxh5rgzOQLcCD6o-CmNKm2qJjxV71Tuh-GX5Q3c_mML7pbln2YaYmDQlCo0PuOqKH6rspzCpIK_bfw0fncrzIcSp2BrdWk2VPzjHo95tgtwPFQGQqbmHi7ISBqqKc1ZNO45HQgU=s0-w100-h100-dcoZSSzLUG",
    "source": "FoodNavigator-Asia.com",
    "datetime": "2022-07-15T04:22:00.000Z",
    "time": "10 hours ago",
    "related": [],
    "prettyUrl": "https://www.foodnavigator-asia.com/Article/2022/07/15/india-focus-beam-suntory-travel-retail-focus-dole-juice-innovation-fresh-produce-shelf-life-booster-and-more",
    "ogData": {
      "link": "https://news.google.com",
      "image": "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300",
      "description": "news description"
    }
  }
]
```

## Upkeep

Please note that this is a web-scraper, which relies on DOM selectors, so any fundamental changes in the markup on the Google News site will probably break this tool. I'll try my best to keep it up-to-date, but changes to the markup on Google News will be silent and therefore difficult to keep track of. Feel free to submit an issue if the tool stops working.

## Issues

Please report bugs via the [issue tracker](https://github.com/adarshsingh1407/neo-google-news-scraper/issues).

## Contribute

Feel free to [submit a PR](https://github.com/adarshsingh1407/neo-google-news-scraper/pulls) if you've fixed an open issue. Thank you.
