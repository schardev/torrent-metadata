import siteConfig from "@/lib/siteConfig";
import Form from "@/components/form";

const Page = () => {
  return (
    <main className="px-4 overflow-auto py-4 lg:min-w-[900px] md:max-w-screen-lg flex-1 max-w-full">
      <div className="mb-6 md:mt-20 md:mb-10">
        <h1 className="text-4xl font-bold mb-2 md:mb-4 text-slate-50 md:text-5xl">
          {siteConfig.title}
        </h1>
        <p className="text-slate-400 md:text-lg">{siteConfig.description}</p>
      </div>
      <Form />
    </main>
  );
};

export default Page;
