> **Note**
> 
> Since the new website, a lot of stuff is becoming legacy.

# Mtg data Scraper
## What is that ?
« mtg-scrapper » (Yes, its « scraper » and not « scrapper », but too late now) is a tiny MTG data scraper/builder
to gather information of competitive tournaments related to MTG:Online, and some other data sources.

It aims to be « lightweight » and « modular » to give you a granular control over it and its
behavior. <br> Yet it is easy to use, with some start-to-data process/functions for users 
who just want to start quickly with it.

It's open source and free, as mentioned in the [ISC license](#ISC-License).

<br><br><hr>

## How to use ?
### Install it
```powershell
  npm i mtg-scrapper
```
### How to start with it
As simple as a serie of function which get an URL and gives you back some metadata and raw data
to work with.

```typescript
//ESM
import { rawParserMtgo } from 'mtg-scrapper';

const data = await rawParserMtgo('UrlOfTournamentOfMtgoWebsite');
```
```typescript
//CJS
const { rawParserMtgo } = require('mtg-scrapper');

const data = await rawParserMtgo('UrlOfTournamentOfMtgoWebsite');
```

The « data » object is built upon an interface named MetaData and is described like that;
```typescript
interface MetaData {
  title: string;
  postedAt: string;
  name: string;
  playersNumber: number;
  playersName: Array<string>;
  uniqueID: string;
  format: TFormat;
  rawResults: string;
  rawBinary: string;
}
```

- uniqueID is an ID that is absolutely unique for any event, you can rerun the same event, and you'll
always have the same ID, but it's not part of the website but built by the module.
- rawResults is a string that can be parsed to JSON format, and is directly taken from the website.
  Its structure is discussed below
- rawBinary is the direct content of the page from the website.

### Extracting « rawResults » data
It's directly taken from the website, without any further processing. The following interface
describes the structure of rawResults;
```typescript
interface RawResults {
  _id: string;
  event_name: string;
  date: string;
  event_type: string;
  decks: Array<{
    player: string;
    loginid: number;
    deck: Array<{
      SB: boolean;
      deck_cards: Array<{
        card_attributes: {
          type: string;
          set: string;
          color: string;
          card_code: number;
          rarity: string;
          name: string;
          cost: number;
        };
        quantity: number;
      }>
    }>
  }>;
  subheader?: string;
  placement: Array<{
    loginid: number;
    rank: number;
  }>;
  standings?: Array<{
    rank: number;
    name: string;
    GWP: number;
    OGWP: number;
    OMWP: number;
    loginid: number;
    points: number;
  }>
  brackets?: Array<{
    index: number;
    matches: Array<{
      players: Array<{
        loginid: number;
        player: string;
        seeding: number;
        wins: number;
        losses: number;
        winner: boolean;
      }>
    }>
  }>;
}
```
It could seem a bit complicated, but it's just a big object with a lot of props.

<br><br><br><hr>

## ISC License

<p>
Permission to use, copy, modify, and/or distribute this software for any purpose 
with or without fee is hereby granted, provided that the above copyright notice and 
this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
OF THIS SOFTWARE.
</p>
