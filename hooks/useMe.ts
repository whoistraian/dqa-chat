import React from "react";
import { MeResponseSchema } from "@/sdk";
import { MeApi } from "@/sdk";

export function useMe() {
  const [me, setMe] = React.useState<MeResponseSchema | null>(null);
  const [status, setStatus] = React.useState<"loading" | "success" | "failed">(
    "loading"
  );

  React.useEffect(() => {
    async function getMe() {
      setStatus("loading");

      try {
        const data = await new MeApi().getMeMeGet();
        setMe(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }

    getMe();
  }, []);

  return { me, status };
}
