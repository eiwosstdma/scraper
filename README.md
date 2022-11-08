> **Warning**
>
> DOCUMENTATION IS NOT FULLY WRITTEN YET

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
It's a modular system, you can import only the function you need if you want.
Though, if you just need to get data quickly without worrying about the API,
just follow here;

To get data of the current day, just do that;
```typescript
import { dataOfTheDay } from 'mtg-scrapper';

/**
 * You can give a configuration to specify formats and type of events,
 * By default, everything competitive mtgo format & events are scraped.
 */

const bulk = await dataOfTheDay();
```
The data is an array containing the metadata of each tournament and deck lists of the tournament.

<br><br><br><hr>

## API DOCUMENTATION
Functions and Classes are described as Interface.

### Filters
```typescript
interface filtering {
  (deck: IDeck, filter: IFilter): IFilter['name'] | null;
}
```
It will return the correct for the deck you passed in parameter. If nothing correspond,
it returns the string 'unknown'.

### Link Generators - MTGO (Probably will be the same API for other websites)
```typescript
/**
 * Create links without checking them, 
 * for a given configuration and a number of days.
 * It will cumulates tournaments within the array, 
 * starting from the current day through the number of days you specified.
 */
interface linkGenerator{
  (days: number, configuration?: IConfigurationLinker): Array<string>;
}
```
```typescript
/**
 * Create links without checking them, 
 * for a given configuration and a day in milmiseconds.
 * It does not cumulate the result if you specify and old day, 
 * but generate only links for the day.
 */
interface generateLinksFrom {
  (dayToScrap: number, configuration?: IConfigurationLinker): Array<string>;
}
```
```typescript
/**
 * Check if the link you give is a valid tournament link, 
 * it will await the time you've given in arguments if needed, 
 * if you have ton of links to check, 
 * it's better to make it await at least a second for each linl,
 * to not flood the given website.
 */
interface checkLink {
  (link: string, awaitFor?: number): Promise<string | null>
}
```
```typescript
/**
 * The same thing that checkLink but check a big array, 
 * return good links and null for links that are not valid.
 */
interface checkArrayOfLinks {
  (links: Array<stirng>, awaitFor?: number): Promise<Array<string | null>>;
}
```

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
