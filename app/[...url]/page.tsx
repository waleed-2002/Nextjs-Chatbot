import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import ChatWrapper from "../components/chatwrapper";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) => decodeURIComponent(component));
  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
    const sessionCookie = cookies().get("sessionId")?.value
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] });
    const sessionId=(reconstructedUrl + "--"+ sessionCookie).replace(/\//g,"")
    
    // console.log('isAlreadyIndexed', isAlreadyIndexed);
    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} />;
};

export default Page;
