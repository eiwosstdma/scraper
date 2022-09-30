# Mtg data Scrape
> **Note**
> 
> Only support MTGO scraping at the moment

> **Warning**
> 
> Linker is now slower because of the risk to get ban for fast fetches.

### What to use ?
<p>
  REWRITING THE DOC
</p>

## How to use ?
> **Warning**
>
> Works only with Node >= 18.0.0 (fetch usage)

### Install it
```powershell
  npm i mtg-scrapper
```
### Import it in your project
```typescript
  import { 
    Card, 
    ConfigurationLinker, 
    Deck, 
    Filter, 
    ICard, 
    IConfigurationLinker, 
    IDeck, 
    IFilter, 
    ITournament, 
    TFormat, 
    TLevelOfPlay, 
    TOrganizer, 
    TPlatform, 
    Tournament, 
    checkArrayOfLinks, 
    checkLink, 
    filtering, 
    formatHelper, 
    getDataFromUrl, 
    guardGeneric, 
    levelOfPlayHelper, 
    linkBuilderRUN, 
    linkGenerator, 
    organizerHelper, 
    parseMtgo, 
    platformHelper, 
    scraperParserRUN 
  } from 'mtg-scrapper';
```
### ISC License

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
