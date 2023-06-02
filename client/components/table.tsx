"use client";

import clsx from "clsx";
import Button from "./button";
import { ArrowLeft, Check, Clipboard } from "@/lib/icons";
import { useState } from "react";
import { copyToClipboard } from "@/lib/util";
import { filesize } from "filesize";

export type TorrentData = {
  data: {
    name?: string;
    infoHash: number;
    magnetURI?: string;
    peers?: number;
    created?: string;
    createdBy?: string;
    comment?: string;
    announce?: string[];
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

  return (
    <>
      {/* main table */}
      <div
        className={clsx(
          "overflow-auto border border-slate-900 rounded-md mb-4",
          className
        )}>
        <table className="w-full">
          <tbody
            className={clsx(
              "[&_th]:p-4 [&_th]:text-left [&_th]:bg-slate-900",
              "[&_td]:p-4 [&_td]:border-b [&_td]:border-b-slate-900",
              "[&_th>span]:text-slate-400",
              "whitespace-nowrap text-sm md:text-base"
            )}>
            {Object.entries(rest).map(([key, value]) => {
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
                  {isCopied ? <Check /> : <Clipboard />}
                  <span>{isCopied ? "Copied" : "Copy"}</span>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* tracker list */}
      {Array.isArray(announce) && announce.length && (
        <details className="[&[open]_svg]:-rotate-90 [&[open]_summary]:mb-4 mb-4 cursor-pointer">
          <summary
            className={clsx(
              "bg-slate-900 py-2 px-4 md:py-4 list-none text-slate-400 font-bold",
              "select-none flex rounded-md"
            )}>
            <span className="mr-auto">Tracker List</span>
            <ArrowLeft className="-rotate-180 transition-transform" />
          </summary>
          <ul className="ml-4 pb-2 space-y-4 text-sm md:text-base overflow-auto">
            {announce.map((tracker) => (
              <li key={tracker}>
                <code className="whitespace-nowrap">{tracker}</code>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* files list */}
      {Array.isArray(sortedFiles) && sortedFiles.length > 0 && (
        <details className="[&[open]_svg]:-rotate-90 [&[open]_summary]:mb-4 cursor-pointer">
          <summary
            className={clsx(
              "bg-slate-900 py-2 px-4 md:py-4 list-none text-slate-400 font-bold",
              "select-none flex rounded-md"
            )}>
            <p className="mr-auto">
              Files
              <code className="text-xs md:text-sm font-normal align-middle ml-2">
                ({sortedFiles.length})
              </code>
            </p>
            <ArrowLeft className="-rotate-180 transition-transform" />
          </summary>
          <ul className="ml-2 pb-2 border-l border-l-slate-800 space-y-4 text-sm md:text-base overflow-auto">
            {sortedFiles.map((file) => {
              const size = file.size ? filesize(file.size) : "";
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
        </details>
      )}
    </>
  );
};

export default Table;
