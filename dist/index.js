"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AHelperFormat: () => AHelperFormat,
  AHelperLevel: () => AHelperLevel,
  AHelperOrganizer: () => AHelperOrganizer,
  AHelperPlatform: () => AHelperPlatform,
  Card: () => Card,
  ConfigurationLinker: () => ConfigurationLinker,
  Deck: () => Deck,
  Filter: () => Filter,
  Tournament: () => Tournament,
  checkArrayOfLinks: () => checkArrayOfLinks,
  checkLink: () => checkLink,
  dataOfTheDay: () => dataOfTheDay,
  extractLinks: () => extractLinks,
  filtering: () => filtering,
  generateLinksFrom: () => generateLinksFrom,
  getDataFromUrl: () => getDataFromUrl,
  getDataFromYearMonth: () => getDataFromYearMonth,
  guardGeneric: () => guardGeneric,
  linkBuilderRUN: () => linkBuilderRUN,
  linkGenerator: () => linkGenerator,
  parseMtgo: () => parseMtgo,
  rawParserMtgo: () => rawParserMtgo,
  scraperParserRUN: () => scraperParserRUN
});
module.exports = __toCommonJS(src_exports);

// src/core/mtgo/scraper-parser/scraper-parser.mtgo.ts
var import_jsdom2 = require("jsdom");

// src/core/utilities.core.ts
var import_node_crypto = require("crypto");
var import_node_util = require("util");
var import_node_https = require("https");
var baseURLMTGOWebsite = () => "https://www.mtgo.com/";
var baseURLMTGODeckLists = () => "https://www.mtgo.com/en/mtgo/decklists/";
var generate12LString = (length) => {
  return (0, import_node_crypto.randomBytes)(length ?? 6).toString("hex");
};
var generateUniqueID = async (metadata) => {
  return new Promise((resolve, reject) => {
    (0, import_node_crypto.scrypt)(metadata, "abcdefijklmnopqrstuvwxyz", 32, { N: 4 }, (err, derivedKey) => {
      if (err)
        reject(err);
      else {
        resolve(derivedKey.toString("hex"));
      }
    });
  });
};
var sleepUntil = (0, import_node_util.promisify)(setTimeout);
var guardGeneric = (unk, typeInArr) => {
  if (typeof unk !== "string")
    return null;
  let isAlive;
  typeInArr.forEach((item) => {
    if (item === unk) {
      isAlive = item;
    }
  });
  return isAlive === void 0 ? null : isAlive;
};
var customFetch = (url) => {
  return new Promise((resolve, reject) => {
    (0, import_node_https.get)(url, (res) => {
      res.on("error", (err) => reject(new Error("URL IS NOT VALID.")));
      if (res.statusCode === void 0 || res.statusCode <= 200 && res.statusCode >= 299) {
        return reject(new Error(`Request failed. Status code => ${res.statusCode ?? "Not defined"}`));
      } else {
        let rawData = "";
        res.on("data", (data) => rawData += data);
        res.on("end", () => resolve(rawData));
      }
    });
  });
};

// src/core/mtgo/link-builder/link-builder.mtgo.ts
var import_jsdom = require("jsdom");
function timeIntoDate(dayInMilli) {
  const dateTo = new Date(dayInMilli ?? new Date().getTime());
  const month = (dateTo.getUTCMonth() + 1).toString();
  const day = dateTo.getUTCDate().toString();
  const theYear = dateTo.getFullYear();
  const theMonth = month.length === 1 ? "0" + month : month;
  const theDay = day.length === 1 ? "0" + day : day;
  return `${theYear}-${theMonth}-${theDay}`;
}
function linkGenerator(howManyDaysBackward, configuration) {
  const baseUrl = baseURLMTGOWebsite();
  const allFormat = configuration?.wantedFormat ?? ["vintage", "legacy", "modern", "pioneer", "pauper", "standard"];
  const allLevel = configuration?.wantedLevel ?? ["league", "preliminary", "challenge", "showcase-challenge", "super-qualifier"];
  const currentDate = new Date();
  const allLinksArray = [];
  for (let i = 0; i <= howManyDaysBackward; i++) {
    const dateToScrap = new Date(currentDate.getTime() - 86400 * 1e3 * i);
    const dateToBeBuilt = timeIntoDate(dateToScrap.getTime());
    const allLinks = [];
    allFormat.forEach((format) => allLevel.forEach((level) => {
      const url = `${baseUrl}${format}-${level}-${dateToBeBuilt}`;
      allLinks.push(url);
    }));
    allLinksArray.push(...allLinks);
  }
  return allLinksArray;
}
function generateLinksFrom(fromTheDay, configuration) {
  const baseUrl = baseURLMTGOWebsite();
  const allFormat = configuration?.wantedFormat ?? ["vintage", "legacy", "modern", "pioneer", "pauper", "standard"];
  const allLevel = configuration?.wantedLevel ?? ["league", "preliminary", "challenge", "showcase-challenge", "super-qualifier"];
  const allLinksArray = [];
  const dateToScrap = new Date(fromTheDay);
  const dateToBeBuilt = timeIntoDate(dateToScrap.getTime());
  const allLinks = [];
  allFormat.forEach((format) => allLevel.forEach((level) => {
    const url = `${baseUrl}${format}-${level}-${dateToBeBuilt}`;
    allLinks.push(url);
  }));
  allLinksArray.push(...allLinks);
  return allLinksArray;
}
async function checkLink(link, awaitFor) {
  try {
    const result = await customFetch(link);
    const doc = new import_jsdom.JSDOM(result).window.document;
    const isNotFound = doc.querySelector(".no-result");
    await sleepUntil(awaitFor ?? 500);
    if (isNotFound?.textContent?.replace(/\s/g, "") !== "noresultfound") {
      return link;
    } else
      return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function checkArrayOfLinks(links, awaitFor) {
  return Promise.all(links.map((link) => checkLink(link, awaitFor ?? 500)));
}
async function linkBuilderRUN(howMuchBackward, configuration, arrOfLinks) {
  if (arrOfLinks) {
    return (await checkArrayOfLinks(arrOfLinks)).filter((value) => value !== null);
  } else {
    const allTournamentLinks = linkGenerator(howMuchBackward, configuration);
    return (await checkArrayOfLinks(allTournamentLinks)).filter((value) => value !== null);
  }
}

// src/core/mtgo/scraper-parser/scraper-parser.mtgo.ts
function createTournamentData(name, totalPlayers, playedAtFrom) {
  const fileNameArr = name.split(".");
  const fileNameArrName = fileNameArr[1].split("-");
  fileNameArrName.pop();
  fileNameArrName.pop();
  fileNameArrName.pop();
  fileNameArrName.reverse();
  fileNameArrName.pop();
  fileNameArrName.reverse();
  const dateFrom = fileNameArr[1].split("-");
  return {
    publicId: fileNameArr[2],
    name: fileNameArr[1],
    postedAt: `${dateFrom[dateFrom.length - 3]}-${dateFrom[dateFrom.length - 2]}-${dateFrom[dateFrom.length - 1]}`,
    playedAt: fileNameArrName.toString() === "league" ? `${dateFrom[dateFrom.length - 3]}-${dateFrom[dateFrom.length - 2]}-${dateFrom[dateFrom.length - 1]}` : playedAtFrom,
    totalPlayer: totalPlayers,
    linkTo: `https://magic.wizards.com/en/articles/archive/mtgo-standings/${fileNameArr[1]}`,
    format: fileNameArr[1].split("-")[0],
    organizer: "wizard",
    platform: "mtgo",
    levelOfPlay: fileNameArrName.toString().replace(",", "-")
  };
}
function createDeckData(element) {
  const subIdName = element.getAttribute("subid");
  const textDeckList = element.querySelectorAll("div.toggle-text.toggle-subnav > div.deck-list-text > div.sorted-by-overview-container.sortedContainer > div.clearfix.element > span.row");
  const mainDeck = [];
  for (const text of textDeckList) {
    const newObj = {
      quantity: Number(text.children[0].innerHTML),
      name: text.children[1].children[0]?.innerHTML ?? text.children[1].innerHTML
    };
    mainDeck.push(newObj);
  }
  const sideDeckList = element.querySelectorAll("div.toggle-text.toggle-subnav > div.deck-list-text > div.sorted-by-sideboard-container.clearfix.element > span.row");
  const sideDeck = [];
  for (const text of sideDeckList) {
    const newObj = {
      quantity: Number(text.getElementsByClassName("card-count")[0].innerHTML),
      name: text.getElementsByClassName("card-name")[0].firstElementChild?.innerHTML ?? text.getElementsByClassName("card-name")[0]?.innerHTML
    };
    sideDeck.push(newObj);
  }
  const ownerName = element.id;
  return {
    name: "unknown",
    owner: ownerName.replace("_", "").replace("-", ""),
    subId: subIdName,
    main: mainDeck,
    side: sideDeck
  };
}
function createMetaData(metaData) {
  return {
    rank: Number(metaData.children[0].innerHTML),
    point: Number(metaData.children[2].innerHTML),
    omwp: metaData.children[3].innerHTML,
    gwp: metaData.children[4].innerHTML,
    ogwp: metaData.children[5].innerHTML
  };
}
async function getDataFromUrl(url) {
  const urlArrSegment = url.split("/");
  const endPart = urlArrSegment[urlArrSegment.length - 1];
  const randomHex = generate12LString();
  try {
    const data = await customFetch(url);
    await sleepUntil(100);
    const fileName = `mtgo.${endPart}.${randomHex}.html`;
    return {
      name: fileName,
      data
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function parseMtgo(name, content) {
  try {
    const data = new import_jsdom2.JSDOM(content).window.document;
    const allDeckLists = Array.from(data.querySelectorAll(".deck-group"));
    const dateFromADecklist = data.querySelector("div.title-deckicon > span.deck-meta");
    const currentDatePlayed = dateFromADecklist.children[1].textContent.split(" ").join("").split("on").reverse()[0].replaceAll("/", "-");
    const tournamentData = createTournamentData(name, allDeckLists.length, currentDatePlayed);
    const players = allDeckLists.map((deckList) => createDeckData(deckList));
    let finalDeckLists;
    if (tournamentData.levelOfPlay !== "league") {
      const allMetaData = data.querySelector("table.sticky-enabled");
      const tBody = Array.from(allMetaData.lastElementChild?.querySelectorAll("tr"));
      const finalMetaData = tBody.map((data2) => createMetaData(data2));
      finalDeckLists = players.map((value, index) => {
        return {
          ...value,
          ...finalMetaData[index],
          tournamentName: tournamentData.name,
          playedAt: tournamentData.playedAt,
          format: tournamentData.format
        };
      });
    } else {
      finalDeckLists = players.map((data2) => {
        return {
          ...data2,
          tournamentName: tournamentData.name,
          playedAt: tournamentData.playedAt,
          format: tournamentData.format
        };
      });
    }
    return {
      tournamentData,
      finalDeckLists
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function scraperParserRUN(url) {
  const dataFromUrl = await getDataFromUrl(url);
  if (dataFromUrl !== null) {
    return await parseMtgo(dataFromUrl.name, dataFromUrl.data);
  } else
    return null;
}
async function dataOfTheDay(configuration) {
  const links = generateLinksFrom(Date.now(), configuration);
  const awaitedBulkData = links.map((link) => scraperParserRUN(link));
  return Promise.all(awaitedBulkData);
}

// src/core/mtgo/tournament-scraper/tournament-scraper.mtgo.ts
var import_jsdom3 = require("jsdom");
var getDataFromYearMonth = async (monthInNumber, yearInNumber) => {
  const month = monthInNumber ?? new Date().getMonth() + 1;
  const year = yearInNumber ?? new Date().getFullYear();
  const linkToScrap = baseURLMTGODeckLists() + year + "/" + month;
  return await customFetch(linkToScrap);
};
var extractLinks = (rawData) => {
  const data = new import_jsdom3.JSDOM(rawData).window.document;
  const decklistItemLists = Array.from(data.querySelectorAll(".decklists-item"));
  return decklistItemLists.map((element) => element.firstElementChild?.getAttribute("href"));
};

// src/core/mtgo/raw-parser.mtgo.ts
var import_jsdom4 = require("jsdom");
var rawParserMtgo = async (url) => {
  const rawBinary = await customFetch(url);
  const window = new import_jsdom4.JSDOM(rawBinary).window;
  const data = window.document;
  const title = data.querySelector("#decklist-item > div.site-content > div.container-page-fluid.decklist-item-page > h1")?.textContent;
  const postedAt = data.querySelector("#decklist-item > div.site-content > div.container-page-fluid.decklist-item-page > p")?.textContent;
  const name = new URL(url).pathname.split("/").at(-1);
  const format = name?.split("-")[0];
  const rawDeckLists = window.document.scripts;
  const rawResults = rawDeckLists[1]?.textContent?.split("window.MTGO.decklists.data =")[1].split(";")[0];
  const deckListInterpreted = JSON.parse(rawResults);
  const playersName = deckListInterpreted?.decks.map((deckList) => deckList.player);
  return {
    title,
    postedAt,
    name,
    playersNumber: deckListInterpreted?.decks.length,
    playersName,
    uniqueID: await generateUniqueID(url),
    format,
    rawResults,
    rawBinary
  };
};

// src/core/filter/filter.core.ts
var filtering = (deck, filter) => {
  if (deck.format !== filter.format)
    return null;
  let includingValue = 0;
  let excludingValue = 0;
  for (const card of deck.main) {
    const isIncluded = filter.includes.find((value) => value.toLowerCase() === card.name.toLowerCase());
    if (filter.excludes.length >= 1) {
      const isExcluded = filter.excludes.find((value) => value.toLowerCase() === card.name.toLowerCase());
      if (isExcluded !== void 0)
        excludingValue++;
    }
    if (isIncluded !== void 0)
      includingValue++;
  }
  if (excludingValue >= 1) {
    return filter.name;
  }
  if (includingValue >= 2) {
    deck.name = filter.name;
    return filter.name;
  }
  return filter.name;
};

// src/core/types.core.ts
var AHelperFormat = ["unknown", "vintage", "legacy", "modern", "pioneer", "standard", "pauper"];
var AHelperPlatform = ["unknown", "mtgo"];
var AHelperOrganizer = ["unknown", "wizard"];
var AHelperLevel = [
  "unknown",
  "league",
  "preliminary",
  "challenge",
  "premier",
  "showcase-challenge",
  "showcase-qualifier",
  "eternal-weekend",
  "super-qualifier"
];

// src/core/definitions.core.ts
var formatHelper = AHelperFormat;
var platformHelper = AHelperPlatform;
var organizerHelper = AHelperOrganizer;
var levelOfPlayHelper = AHelperLevel;
var Card = class {
  constructor(args) {
    if (!(args instanceof Object))
      throw new TypeError("Argument is not of type Object");
    this.name = args.name ?? "unknown";
    this.quantity = args.quantity ?? 0;
    if (args.linkId)
      this.linkId = args.linkId;
  }
};
var Filter = class {
  constructor(args) {
    const isFormat = guardGeneric(args.format, formatHelper);
    this.format = isFormat === null ? "unknown" : isFormat;
    this.name = args.name ?? "unknown";
    this.includes = args.includes instanceof Array ? args.includes : [];
    this.excludes = args.excludes instanceof Array ? args.excludes : [];
  }
};
var Deck = class {
  constructor(args) {
    if (!(args instanceof Object))
      throw new TypeError("Argument is not of type Object");
    const isFormat = guardGeneric(args.format, formatHelper);
    this.tournamentName = args.tournamentName ?? "unknown";
    this.playedAt = args.playedAt ?? "unknown";
    this.name = args.name ?? "unknown";
    this.subId = args.subId ?? "unknown";
    this.owner = args.owner ?? "unknown";
    this.format = isFormat === null ? "unknown" : isFormat;
    this.main = args.main instanceof Array ? args.main : [];
    this.side = args.side instanceof Array ? args.side : [];
    if (args.id)
      this.id = args.id;
    if (args.postedAt)
      this.postedAt = args.postedAt;
    if (args.rank)
      this.rank = args.rank;
    if (args.point)
      this.point = args.point;
    if (args.omwp)
      this.omwp = args.omwp;
    if (args.gwp)
      this.gwp = args.gwp;
    if (args.ogwp)
      this.ogwp = args.ogwp;
  }
};
var Tournament = class {
  constructor(args) {
    if (!(args instanceof Object))
      throw new TypeError("Argument is not of type Object");
    const isFormat = guardGeneric(args.format, formatHelper);
    const isOrganizer = guardGeneric(args.organizer, organizerHelper);
    const isPlatform = guardGeneric(args.format, platformHelper);
    const isLevelOfPlay = guardGeneric(args.format, levelOfPlayHelper);
    this.format = isFormat === null ? "unknown" : isFormat;
    this.organizer = isOrganizer === null ? "unknown" : isOrganizer;
    this.platform = isPlatform === null ? "unknown" : isPlatform;
    this.levelOfPlay = isLevelOfPlay === null ? "unknown" : isLevelOfPlay;
    this.publicId = args.publicId ?? "unknown";
    this.name = args.name ?? "unknown";
    this.playedAt = args.playedAt ?? "unknown";
    this.postedAt = args.postedAt ?? "unknown";
    this.linkTo = args.linkTo ?? "unknown";
    this.totalPlayer = args.totalPlayer ?? 123456;
    if (this.id)
      this.id = args.id;
  }
};
var ConfigurationLinker = class {
  constructor(args) {
    if (!(args instanceof Object))
      throw new TypeError("Argument is not of type Object");
    if (args.wantedFormat) {
      this.wantedFormat = [];
      for (const format of args.wantedFormat) {
        const isFormat = guardGeneric(format, formatHelper);
        if (isFormat !== null)
          this.wantedFormat.push(isFormat);
      }
    }
    if (args.wantedLevel) {
      this.wantedLevel = [];
      for (const format of args.wantedLevel) {
        const isFormat = guardGeneric(format, levelOfPlayHelper);
        if (isFormat !== null)
          this.wantedLevel.push(isFormat);
      }
    }
    this.wantedFormat = args.wantedFormat ?? [];
    this.wantedLevel = args.wantedLevel ?? [];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AHelperFormat,
  AHelperLevel,
  AHelperOrganizer,
  AHelperPlatform,
  Card,
  ConfigurationLinker,
  Deck,
  Filter,
  Tournament,
  checkArrayOfLinks,
  checkLink,
  dataOfTheDay,
  extractLinks,
  filtering,
  generateLinksFrom,
  getDataFromUrl,
  getDataFromYearMonth,
  guardGeneric,
  linkBuilderRUN,
  linkGenerator,
  parseMtgo,
  rawParserMtgo,
  scraperParserRUN
});
