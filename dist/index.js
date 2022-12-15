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
  filtering: () => filtering,
  guardGeneric: () => guardGeneric,
  rawParserMtgo: () => rawParserMtgo,
  tournamentScraperMtgo: () => tournamentScraperMtgo
});
module.exports = __toCommonJS(src_exports);

// src/core/mtgo/tournament-scraper/tournament-scraper.mtgo.ts
var import_jsdom = require("jsdom");

// src/core/utilities.core.ts
var import_node_crypto = require("crypto");
var import_node_util = require("util");
var import_node_https = require("https");
var baseURLMTGODeckLists = () => "https://www.mtgo.com/en/mtgo/decklists/";
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

// src/core/mtgo/tournament-scraper/tournament-scraper.mtgo.ts
var tournamentScraperMtgo = async (month, year) => {
  const currentMonth = month ?? new Date().getMonth() + 1;
  const currentYear = year ?? new Date().getFullYear();
  const url = baseURLMTGODeckLists() + currentYear + "/" + currentMonth;
  const data = await customFetch(url);
  const fromDoc = new import_jsdom.JSDOM(data).window.document;
  const listOfElements = Array.from(fromDoc.querySelectorAll(".decklists-item"));
  return listOfElements.map((element) => element.firstElementChild?.getAttribute("href"));
};

// src/core/mtgo/raw-parser/raw-parser.mtgo.ts
var import_jsdom2 = require("jsdom");
var rawParserMtgo = async (url) => {
  const rawBinary = await customFetch(url);
  const window = new import_jsdom2.JSDOM(rawBinary).window;
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
  filtering,
  guardGeneric,
  rawParserMtgo,
  tournamentScraperMtgo
});
