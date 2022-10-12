# Mtg data Scrape

## How to use ?
> **Warning**
>
> DOC IS NOT WROTE YET

## Install it
```powershell
  npm i mtg-scrapper
```
## API DOCUMENTATION
<p>
  All functions are described with interfaces.
</p>

### Filters
```typescript
/**
 * Compare a instance of Deck against a given filter 
 * and output either the name for the deck if the filter do apply or null.
 */
interface filtering {
  (deck: IDeck, filter: IFilter): IFilter['name'] | null;
}
```

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
