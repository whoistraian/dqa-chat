"use client";

import { Thread } from "@/components/ui/assistant-ui/thread";
import { useMe } from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const { me, status } = useMe();

  React.useEffect(() => {
    if (status === "failed") {
      router.push("/login");
    }
  }, [status, router, me]);

  return <Thread />;
}
