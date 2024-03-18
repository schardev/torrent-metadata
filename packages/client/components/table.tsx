"use client";

import clsx from "clsx";
import { Check, PasteClipboard } from "iconoir-react";
import { useState } from "react";
import { filesize } from "filesize";
import { copyToClipboard } from "@/lib/util";
import Button from "./button";
import Details from "./details";

export type TorrentData = {
  data: {
    name?: string;
    infoHash: number;
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
    files?: Array<{ name: string; size: string }>;
  };
  message?: string;
};

const Table = ({
  data,
  className,
}: {
  data: TorrentData["data"];
  className?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { files, announce, magnetURI, ...rest } = data;
  const sortedFiles = files?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const totalFileSize = sortedFiles?.reduce((acc, file) => acc + +file.size, 0);

  return (
    <>
      {/* main table */}
      <div
        className={clsx(
          "overflow-auto border border-slate-800 rounded-md mb-4",
          className,
        )}>
        <table className="w-full">
          <tbody
            className={clsx(
              "[&_th]:p-4 [&_th]:text-left [&_th]:bg-slate-900 [&_th>span]:text-slate-400",
              "[&_td]:p-4 [&_td]:border-b [&_td]:border-b-slate-800",
              "whitespace-nowrap text-sm md:text-base",
            )}>
            {Object.entries(rest).map(([key, value]) => {
              if (typeof value !== "string" && typeof value !== "number")
                return;

              return (
                <tr key={key}>
                  <th scope="row">
                    <span className="capitalize">{key}</span>
                  </th>
                  <td>
                    <code>{value}</code>
                  </td>
                </tr>
              );
            })}
            <tr>
              <th>
                <span>Magnet Link</span>
              </th>
              <td>
                <Button
                  variant={{ color: "primary" }}
                  className="px-2 py-1 flex gap-1 items-center"
                  onClick={async () => {
                    const copied = await copyToClipboard(magnetURI || "");
                    setIsCopied(copied);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 3500);
                  }}>
                  {isCopied ? (
                    <Check className="w-5" />
                  ) : (
                    <PasteClipboard className="w-5" />
                  )}
                  <span>{isCopied ? "Copied" : "Copy"}</span>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* tracker list */}
      {Array.isArray(announce) && !!announce.length && (
        <Details
          title={
            <p>
              Tracker List
              <code className="text-xs md:text-sm font-normal align-middle ml-2">
                ({announce.length})
              </code>
            </p>
          }>
          <ul className="ml-4 pb-2 space-y-4 text-sm md:text-base overflow-auto">
            {announce.map((tracker) => (
              <li key={tracker}>
                <code className="whitespace-nowrap">{tracker}</code>
              </li>
            ))}
          </ul>
        </Details>
      )}

      {/* files list */}
      {Array.isArray(sortedFiles) && sortedFiles.length > 0 && (
        <Details
          title={
            <p>
              Files
              <code className="text-xs md:text-sm font-normal align-middle ml-2">
                ({sortedFiles.length})
              </code>
              {totalFileSize && (
                <code className="text-xs md:text-sm font-normal align-middle ml-2">
                  [{filesize(totalFileSize)}]
                </code>
              )}
            </p>
          }>
          <ul className="ml-2 pb-2 border-l border-l-slate-800 space-y-4 text-sm md:text-base overflow-auto">
            {sortedFiles.map((file) => {
              const size = file.size ? filesize(+file.size) : "";
              return (
                <li key={file.name} className="pl-4">
                  <code>
                    {file.name}{" "}
                    {size && (
                      <span className="whitespace-nowrap text-slate-400">
                        [{size.toString()}]
                      </span>
                    )}
                  </code>
                </li>
              );
            })}
          </ul>
        </Details>
      )}
    </>
  );
};

export default Table;
