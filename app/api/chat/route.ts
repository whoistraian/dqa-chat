import { env } from "@/env.mjs";
import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { LangChainAdapter, StreamingTextResponse } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const remoteChain = new RemoteRunnable<object, string, object>({
    url: env.REMOTE_RUNNABLE_URL,
  });

  const stream = await remoteChain.stream(
    messages[messages.length - 1].content
  );

  const aiStream = LangChainAdapter.toAIStream(stream);

  return new StreamingTextResponse(aiStream);
}
