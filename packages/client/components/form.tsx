"use client";

import clsx from "clsx";
import { NavArrowLeft } from "iconoir-react";
import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/button";
import Callout from "@/components/callout";
import DragDropForm from "@/components/drag-drop-form";
import Table, { TorrentData } from "@/components/table";
import TextForm from "@/components/text-form";
import { API_URL } from "@/lib/constant";
import { Spinner } from "@/lib/icons";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [data, setData] = useState<TorrentData | null>(null);

  // hit endpoint to warm up api instance
  useEffect(() => {
    fetch(`${API_URL}/ping`);
  }, []);

  const resetState = () => {
    setIsSubmitted(false);
    setError(false);
    setData(null);
  };

  const submitFormData = async (formData: FormData) => {
    setIsSubmitted(true);

    // make sure we abort in case the server takes longer to respond for whatever reason
    const controller = new AbortController();
    const id = setTimeout(() => {
      setError("Fetch timeout.");
      controller.abort();
    }, 10_000);

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(id)

    const serverReq = await res.json();
    // 504 - request timeout
    if (res.status !== 200 && res.status !== 504)
      setError(serverReq?.error || "Server error!");

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
        {/* text input */}
        <TextForm />

        {/* separator */}
        <div className="my-12 border-b border-b-slate-700 relative">
          <span
            className={clsx(
              "text-slate-400 absolute bg-slate-950 px-4",
              "left-[calc(50%-1rem)] -translate-y-1/2",
            )}>
            OR
          </span>
        </div>

        {/* drag and drop */}
        <DragDropForm submitFormData={submitFormData} />
      </form>
    );
  }

  if (error) {
    return (
      <>
        <Callout title="Error" variant={{ color: "error" }} className="mb-6">
          <p>{error}</p>
        </Callout>
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
          className="text-slate-400 text-sm md:text-base hover:text-slate-200"
          onClick={resetState}>
          <NavArrowLeft className="inline w-5" />
          <span className="align-middle">back</span>
        </button>
        {data.message && (
          <Callout
            title="info"
            variant={{ color: "info" }}
            className="mb-6 mt-6">
            <p>{data.message}</p>
          </Callout>
        )}
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
