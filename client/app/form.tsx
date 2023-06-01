"use client";

import DragDropForm from "@/components/drag-drop-form";
import Table, { TorrentData } from "@/components/table";
import TextForm from "@/components/text-form";
import { API_URL } from "@/lib/constant";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { ArrowLeft, Info, Spinner } from "./icons";
import Button from "@/components/button";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [data, setData] = useState<TorrentData | null>(null);

  const resetState = () => {
    setIsSubmitted(false);
    setError(false);
    setData(null);
  };

  const submitFormData = async (formData: FormData) => {
    setIsSubmitted(true);

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const serverReq = await res.json();
    if (res.status !== 200) setError(serverReq?.error || "Server error!");

    setData(serverReq);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    submitFormData(data);
  };

  if (!isSubmitted) {
    return (
      <form onSubmit={handleFormSubmit}>
        <TextForm />
        <div className="my-12 border-b border-b-slate-700 relative">
          <span
            className={clsx(
              "text-sm text-slate-400 absolute bg-slate-950",
              "px-2 left-[calc(50%-0.5rem)] translate-y-[-50%]"
            )}>
            OR
          </span>
        </div>
        <DragDropForm submitFormData={submitFormData} />
      </form>
    );
  }

  if (error) {
    return (
      <>
        <div className="text-red-500 border border-red-500 rounded-md p-4 mb-6">
          <div className="flex gap-2 items-center mb-4">
            <Info className="text-sm" />
            <span className="font-medium">Error</span>
          </div>
          <p>{error}</p>
        </div>
        <Button className="px-2 py-1" onClick={resetState}>
          Try Again
        </Button>
      </>
    );
  }

  if (data) {
    const torrentData = data.data;
    return (
      <>
        <button
          className={clsx("text-slate-400 text-sm md:text-base")}
          onClick={resetState}>
          <ArrowLeft className="inline" />
          <span className="align-middle">Go Back</span>
        </button>
        <Table data={torrentData} className="mt-6" />
      </>
    );
  }

  return (
    <div className="flex justify-center items-center h-[200px]">
      <Spinner className="animate-spin" />
    </div>
  );
};

export default Form;
