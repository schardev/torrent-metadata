"use client";

import { CloudUpload } from "iconoir-react";
import clsx from "clsx";
import { ChangeEvent, DragEvent } from "react";
import { buttonVariants } from "./button";

const DragDropForm = ({
  submitFormData,
}: {
  submitFormData: (data: FormData) => void;
}) => {
  const handleFile = (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.set("torrent_file", file);
    submitFormData(formData);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    // prevent browser from opening the file
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("!border-slate-100");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("!border-slate-100");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
    e.currentTarget.classList.remove("!border-slate-100");
  };

  const handleFileAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return;
    handleFile(e.currentTarget.files[0]);
  };

  return (
    <div
      className={clsx(
        "relative bg-slate-900/20 rounded-lg text-slate-400",
        "border-2 border-dashed border-slate-700 select-none",
        "flex flex-col gap-4 items-center justify-center",
        "py-10 lg:py-14",
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <div className="space-y-4 md:text-lg text-center pointer-events-none">
        <CloudUpload className="text-4xl mx-auto" />
        <p>
          Drag and drop <code className="inline">.torrent</code> file
        </p>
        <p>OR</p>
      </div>
      <label
        htmlFor="torrent_file"
        className={buttonVariants({
          color: "secondary",
          className: "inline px-4 py-2",
        })}>
        Browse Files
      </label>
      <input
        type="file"
        id="torrent_file"
        name="torrent_file"
        className="sr-only"
        accept="application/x-bittorrent,.torrent"
        onChange={handleFileAdd}
      />
    </div>
  );
};

export default DragDropForm;
