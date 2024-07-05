import { AuthApi } from "@/sdk";

export function useAuth() {
  async function login(e: React.FormEvent<HTMLFormElement>) {
    const authApi = new AuthApi();

    await authApi.loginAuthLoginPost(
      {
        authRequestSchema: {
          email: e.currentTarget.email.value as string,
          password: e.currentTarget.password.value as string,
        },
      },
      { credentials: "same-origin" }
    );
  }

  return { login };
}
