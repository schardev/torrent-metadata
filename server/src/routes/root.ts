import express from "express";
import { isValidTorrentData } from "../middlewares.js";
import { log } from "../utils.js";
import WebTorrent, { type Torrent } from "webtorrent";

const router = express.Router();
const SITE_URL = process.env.SITE_URL;
const METADATA_FETCH_TIMEOUT = 6000; // in ms
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

// This has to come first for `req.parsedTorrent` to be validated and populated
router.post("/", isValidTorrentData);

router.post("/", async (req, res) => {
  log("Init POST ...");
  const client = new WebTorrent();
  const parsedTorrent = req.parsedTorrent;
  const torrent = client.add(parsedTorrent, {
    path: process.cwd(),
    destroyStoreOnDestroy: true,
  });

  // If the torrent doesn't have enough peers to retrieve metadata, return
  // limited info we get from parsing the magnet URI (the parsed metadata is guaranteed
  // to have `infoHash` field)
  const timeoutID = setTimeout(async () => {
    res.status(504).json({
      data: constructData(torrent),
      message:
        "The torrent provided doesn't seem to have enough peers to fetch metadata. Returning limited info.",
    });

    client.remove(torrent, {}, () => {
      log("Timeout while fetching torrent metadata.");
    });
  }, METADATA_FETCH_TIMEOUT);

  torrent.on("metadata", () => {
    log("Metadata parsed...");
    clearTimeout(timeoutID);
    res.json({ data: constructData(torrent) });

    client.remove(torrent, {}, () => {
      log("Torrent removed.");
    });
  });
});

export default router;
