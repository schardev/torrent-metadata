import express from "express";
import { isValidTorrentData } from "../middlewares.js";
import { log } from "../utils.js";
import WebTorrent, { type Torrent } from "webtorrent";
import webtorrentHealth, { type TrackerResult } from "webtorrent-health";

const router = express.Router();
const SITE_URL = process.env.SITE_URL;
const METADATA_FETCH_TIMEOUT = 6000; // in ms
const SCRAPING_TIMEOUT = 4500; // in ms
const webtorrent = new WebTorrent();

const constructData = (torrent: Torrent) => {
  const data = {
    name: torrent.name,
    infoHash: torrent.infoHash,
    magnetURI: torrent.magnetURI,
    peers: torrent.numPeers,
    created: torrent.created,
    createdBy: torrent.createdBy,
    comment: torrent.comment,
    announce: torrent.announce,
    files: torrent.files.map((file) => ({
      name: file.name,
      size: file.length,
      path: file.path,
    })),
  };

  return data;
};

router.get("/", (_, res) => {
  if (process.env.NODE_ENV === "production" && SITE_URL) {
    return res.redirect(301, SITE_URL);
  }
  res.status(200).json({ status: "ok" });
});

router.get("/ping", (req, res) => {
  res.send(`pong: ${Date.now() - req.startTime}ms`);
});

router.post("/", isValidTorrentData, async (req, res) => {
  log("Init POST ...");

  const torrent = webtorrent.add(req.parsedTorrent, {
    destroyStoreOnDestroy: true,
  });

  // If the torrent doesn't have enough peers to retrieve metadata, return
  // limited info we get from parsing the magnet URI (the parsed metadata is guaranteed
  // to have `infoHash` field)
  const timeoutID = setTimeout(() => {
    res.status(504).json({
      data: constructData(torrent),
      message:
        "The torrent provided doesn't seem to have enough peers to fetch metadata. Returning limited info.",
    });

    webtorrent.remove(torrent, {}, () => {
      log("Timeout while fetching torrent metadata.");
    });
  }, METADATA_FETCH_TIMEOUT);

  torrent.on("metadata", async () => {
    log("Metadata parsed...");
    clearTimeout(timeoutID);

    let trackerData = {} as TrackerResult;
    if (Array.isArray(torrent.announce) && torrent.announce.length) {
      log("Scraping trackers...");
      trackerData = await webtorrentHealth(torrent, {
        timeout: SCRAPING_TIMEOUT,
      });
    }

    const data = {
      ...constructData(torrent),
      seeds: trackerData.seeds,
      peers: trackerData.peers,
      trackers_info: trackerData.extra,
    };
    res.json({ data });

    webtorrent.remove(torrent, {}, () => {
      log("Torrent removed.");
    });
  });
});

export default router;
