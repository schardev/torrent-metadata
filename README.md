<div align="center">
    <img src="./packages/client/public/icon.png" alt="Torrent Metadata">
    <h1>Torrent Metadata</h1>
    <p align="center">A simple web app to extract metadata from <code>.torrent</code> file, magnet URI or torrent info hash.</p>
</div>
<br/>

# Getting Started

## Server

To run it locally simply install all dependencies and run `pnpm dev`. Also, make sure you run server on proper port or adjust the `API_URL` on [client](https://github.com/schardev/torrent-metadata/blob/c2fd5262d5769bc6690efe4ac0cdec1f986c721b/client/lib/constant.ts#L1) side.

```bash
# clone the repo
git clone https://github.com/schardev/torrent-metadata

# install dependencies (same for client)
cd torrent-metadata/server; pnpm install

pnpm dev
```

The server is now running on `localhost:3000` and can respond with queries.

### Using the API

<!-- > **Note**: I'm using [`httpie`](https://github.com/httpie/httpie) for demonstrating how to query the API but you can use `curl` or whatever. -->

#### Querying with magnet URI or info hash:

```bash
# The API endpoint takes a `query` parameter that could be set to either a torrent magnet URI or info hash
http :3000 query='magnet:?xt=urn:btih:6e8537c9160e80042f0bc5a880ea8bf9144683ff&dn=archlinux-2023.06.01-x86_64.iso'

# OR using curl
curl -X POST "http://localhost:3000" \
    -H "Content-Type: application/json" \
    -d '{"query": "magnet:?xt=urn:btih:6e8537c9160e80042f0bc5a880ea8bf9144683ff&dn=archlinux-2023.06.01-x86_64.iso"}'
```

You can also send the query as `application/x-www-form-urlencoded` or as `multipart/form-data` (so you don't have to think about your JSON's format):

```bash
# `httpie`
http --form POST :3000 query='magnet:?xt=urn:btih:6e8537c9160e80042f0bc5a880ea8bf9144683ff&dn=archlinux-2023.06.01-x86_64.iso'

# OR curl
curl -X POST "https://localhost:3000"
   -H "Content-Type: application/x-www-form-urlencoded"
   -d 'query=magnet:?xt=urn:btih:6e8537c9160e80042f0bc5a880ea8bf9144683ff&dn=archlinux-2023.06.01-x86_64.iso'
```

#### Querying with `.torrent` file:

```bash
# `httpie`
http --multipart POST :3000 torrent_file@'/path/to/file.torrent'

# OR curl
curl -X POST "http://localhost:3000" -F torrent_file=@'/path/to/file.torrent'
```

After successfully querying, it'll send a [`Response`](#response).

```js
{
  "data": {
    "announce": [],
    "files": [
      {
        "name": "archlinux-2023.06.01-x86_64.iso",
        "path": "archlinux-2023.06.01-x86_64.iso",
        "size": 828715008
      }
    ],
    "infoHash": "6e8537c9160e80042f0bc5a880ea8bf9144683ff",
    "magnetURI": "magnet:?xt=urn:btih:6e8537c9160e80042f0bc5a880ea8bf9144683ff&dn=archlinux-2023.06.01-x86_64.iso",
    "name": "archlinux-2023.06.01-x86_64.iso",
    "peers": 28,
    "seeds": 69
  }
}
```

If there is an error it'll respond with an `error` field that has the error message and the `query` for which the request has failed (if a file was sent then the `query` field contains the filename), for example:

```js
{
    "error": "Invalid info hash, magnet URI or .torrent file.",
    "query": "magnet:?xt=urn:this-is-an-invalid-magnet-link"
}
```

### Endpoints

**Public API Endpoint:** [`https://torrentmeta.fly.dev`](https://torrentmeta.fly.dev)

| Endpoint | Method | Notes                                                                                                                                                                                                |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`      | `GET`  | Redirects to `process.env.SITE_URL` if present, else returns `{ status: "ok" }`.                                                                                                                     |
| `/ping`  | `GET`  | To check if the server is properly responding. Returns `{ pong: <response time in ms> }`                                                                                                             |
| `/`      | `POST` | Takes a `query` parameter that should either contain a magnet URI or torrent info hash. If no `query`, also takes a `torrent_file` parameter that should be a properly form encoded `.torrent` file. |

### Response

**Success:**

```ts
type TorrentResponse = {
  data?: {
    name?: string;
    infoHash?: string;
    magnetURI?: string;
    peers?: number;
    seeds?: number;
    created?: string;
    createdBy?: string;
    comment?: string;
    announce?: string[];
    trackers_info?: (
      | {
          tracker: string;
          seeds: number;
          peers: number;
          downloads: number;
          response_time: number;
        }
      | { tracker: string; error: string }
    )[];
    files?: Array<{
      name: string;
      size: number;
      path: string;
    }>;
  };
};
```

**Error**:

```ts
type ErrorResponse = {
  error: string;
  query: string;
};
```

## Client

```bash
# clone the repo
git clone https://github.com/schardev/torrent-metadata

# install dependencies
cd torrent-metadata/client; pnpm install

pnpm dev
```

Make sure to properly set `API_URL` before launching the front-end.

## Stack

- Express
- Next.js
- Tailwind CSS
