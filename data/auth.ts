"use server";

import { AuthApi } from "@/sdk";
import { redirect } from "next/navigation";

export async function register(formData: FormData): Promise<void> {
  const authApi = new AuthApi();

  await authApi.registerAuthRegisterPost({
    authRequestSchema: {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },
  });

  redirect("/login");
}
