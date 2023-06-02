import { ErrorRequestHandler, RequestHandler } from "express";
import { error, log } from "./utils.js";
import parseTorrent from "parse-torrent";

export const isValidTorrentData: RequestHandler = async (req, res, next) => {
  log("Validating torrent query...");

  const query = (req.body.query as string) || req.file?.buffer;
  if (!query) {
    return res.status(400).json({
      error:
        "Expected info hash, magnet URI or .torrent file, instead got nothing.",
    });
  }

  try {
    req.parsedTorrent = await parseTorrent(query);
  } catch (err) {
    log(err);
    return res.status(400).json({
      error: "Invalid info hash, magnet URI or .torrent file.",
      query: typeof query === "string" ? query : req.file?.originalname || "",
    });
  }

  log("Validated torrent query.");
  next();
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _) => {
  error("Error occurred while processing request");
  console.error(err);
  res.status(500).json({ error: "Server error." });
};
