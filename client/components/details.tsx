import clsx from "clsx";
import { NavArrowLeft } from "iconoir-react";

const Details = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <details className="[&[open]_svg]:-rotate-90 [&[open]_summary]:mb-4 mb-4 cursor-pointer">
      <summary
        className={clsx(
          "bg-slate-900 py-2 px-4 md:py-4 list-none text-slate-400 font-bold",
          "select-none flex rounded-md",
        )}>
        {title}
        <NavArrowLeft className="ml-auto -rotate-180 transition-transform" />
      </summary>
      {children}
    </details>
  );
};

export default Details;
