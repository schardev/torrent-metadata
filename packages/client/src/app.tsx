import clsx from "clsx";
import siteConfig from "@/lib/siteConfig";
import Form from "@/components/form";

function App() {
  return (
    <div
      className={clsx(
        "bg-slate-950 text-slate-50 min-h-screen font-sans selection:bg-slate-600",
        "flex flex-col items-center gap-4",
      )}>
      <main className="px-4 overflow-auto py-4 w-full md:max-w-4xl flex-1 max-w-full">
        <div className="mb-6 md:mt-20 md:mb-10">
          <h1 className="text-4xl font-bold mb-2 md:mb-4 text-slate-50 md:text-5xl">
            {siteConfig.title}
          </h1>
          <p className="text-slate-400 md:text-lg">{siteConfig.description}</p>
        </div>
        <Form />
      </main>
      <footer className="px-4 py-4 w-full md:max-w-4xl">
        <p className="text-slate-400 text-sm lg:text-base">
          Built by{" "}
          <a
            href={siteConfig.github}
            target="_blank"
            className="underline hover:text-slate-200">
            schardev
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.source}
            target="_blank"
            className="underline hover:text-slate-200">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default App;
