import { Search } from "iconoir-react";
import clsx from "clsx";
import Button from "./button";

const TextForm = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      <input
        placeholder="Paste magnet URL or info hash here..."
        type="text"
        name="query"
        id="hashOrUri"
        autoComplete="off"
        minLength={32}
        required
        className={clsx(
          "flex-grow p-2 md:px-4 md:py-3 bg-slate-950 rounded-md text-slate-50",
          "border border-slate-700",
          "placeholder:text-sm placeholder:text-slate-400 md:placeholder:text-base",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300",
          "focus-visible:outline-offset-2",
        )}
      />
      <Button className="flex gap-2 items-center p-2 md:px-4 text-sm md:text-base">
        <span>Search</span>
        <Search className="w-5" />
      </Button>
    </div>
  );
};

export default TextForm;
