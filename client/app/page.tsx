import siteConfig from "@/lib/siteConfig";
import Form from "@/components/form";

const Page = () => {
  return (
    <main className="px-6 overflow-auto py-6 lg:min-w-[900px] md:max-w-screen-lg">
      <div className="mt-20 mb-10">
        <h1 className={"text-4xl font-bold mb-2 text-slate-50 md:text-5xl"}>
          {siteConfig.title}
        </h1>
        <p className="text-slate-400 md:text-lg">{siteConfig.description}</p>
      </div>
      <Form />
    </main>
  );
};

export default Page;
