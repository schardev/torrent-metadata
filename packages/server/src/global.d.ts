type ParsedTorrent = string | ArrayBufferView | Record<string, any>;

declare module "parse-torrent" {
  export default function parseTorrent(
    torrentId: ParsedTorrent,
  ): Promise<Record<any, any>>;
}

declare module "webtorrent-health" {
  export type TrackerResult = {
    seeds: number;
    peers: number;
    extra: (
      | {
          tracker: string;
          seeds: number;
          peers: number;
          downloads: number;
          response_time: number;
        }
      | { tracker: string; error: string }
    )[];
  };

  type Options = {
    trackers?: string[];
    blacklist?: string[];
    timeout?: number;
  };

  function webtorrentHealth(
    torrentId: ParsedTorrent,
    opts?: Options,
  ): Promise<TrackerResult>;

  function webtorrentHealth(
    torrentId: ParsedTorrent,
    opts?: Options,
    callback: (err: Error, data: TrackerResult) => void,
  ): void;
  export default webtorrentHealth;
}

declare namespace Express {
  export interface Request {
    parsedTorrent: ParsedTorrent;
    startTime: number;
  }
}
